import { useState } from 'react';
import { Flex, Box, Button, Textarea, Badge } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { ChakraNextLinkButton } from '../ChakraNextLinkButton';

export const TweetComposer = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - text.length;
  const tweet = encodeURIComponent(`${text}${suffix}`);

  return (
    <>
      {/*{'4.0rem'}{ base: '4rem', md: '10.8rem' }*/}
      <Textarea
        size="sm"
        resize="none"
        minHeight={isTyping ? '9rem' : '2.5rem'}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        placeholder="Write your tweet concept/question here"
        value={text}
        transitionProperty="min-height"
        transitionDuration=".3s"
        transitionTimingFunction="ease"
        onChange={(e) => setText(e.target.value)}
      />
      <Flex direction={'row'} justifyContent={'space-between'}>
        <Badge maxW="fit-content" colorScheme={counter < 0 ? 'red' : ''}>
          {counter}
        </Badge>
        <Box as="span">cc @sseraphini</Box>
      </Flex>

      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'flex-end'}
      >
        <Button
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          mt="10px"
          as={'a'}
          href={`https://twitter.com/intent/tweet?text=${tweet}`}
          target="_blank"
          width={'49%'}
        >
          Tweet
        </Button>

        <ChakraNextLinkButton
          leftIcon={<BsSearch />}
          backgroundColor="green.200"
          as={'a'}
          href={`/search`}
          width={'49%'}
        >
          Search
        </ChakraNextLinkButton>
      </Flex>
    </>
  );
};
