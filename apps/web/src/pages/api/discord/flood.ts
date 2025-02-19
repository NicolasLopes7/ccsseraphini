import withErrorHandler from 'middlewares/error-handler';
import withValidation from 'middlewares/validations';
import { NextApiRequest, NextApiResponse } from 'next';
import { TweetData } from 'types/Tweet';
import { config } from '../../../config';

// Learn Discord Webhook: https://discord.com/developers/docs/resources/webhook#execute-webhook

// cron-job.org will trigger this function every x minutes
const floodDiscordChannelWithTweets = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const query = '-RT cc @sseraphini';

  // TODO Dry this code, we have the same code: ccsseraphini/apps/web/src/pages/index.tsx
  const httpProtocol = req.headers.host?.includes('localhost')
    ? 'http'
    : 'https';

  const url = `${httpProtocol}://${req.headers.host}/api/tweets?query=${query}`;

  const response = await fetch(url);

  if (response.status !== 200)
    res.status(500).send("I can't get the tweets, try again later");

  const data = await response.json();

  const WEBHOOK_DISCORD = config.WEBHOOK_DISCORD;

  const promisesPostTweetOnDiscord = data.tweets.map((tweet: TweetData) => {
    return () =>
      fetch(WEBHOOK_DISCORD, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          content: `https://twitter.com/${tweet.userInfo.username}/status/${tweet.id}`,
        }),
      });
  });

  try {
    // TODO handle with discord rate limit
    for await (const runPromise of promisesPostTweetOnDiscord) {
      await runPromise();
    }
    res.status(200).send('Tweets posted on Discord');
  } catch (error: any) {
    throw new Error(
      "I can't post the tweets, try again later, reason -> " + error.message,
    );
  }
};

export default withErrorHandler(withValidation(floodDiscordChannelWithTweets));
