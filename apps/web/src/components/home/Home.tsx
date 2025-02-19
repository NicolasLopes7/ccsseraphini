import { Flex, Image } from '@chakra-ui/react';
import { TweetComposer } from './TweetComposer';
import { ActionButtons } from './ActionButtons';
import { DonateEth } from './DonateEth';
import { DonateSol } from './DonateSol';
import { DonatePix } from '../pix/DonatePix';
import { SessionProvider } from 'next-auth/react';
import { TwitterLogin } from './TwitterLogin';

export const Home = () => {
  return (
    <Flex
      flex={1}
      maxW={'100%'}
      // height="100vh"
      alignItems="center"
      // justifyContent="center"
      flexDirection="column"
      // bg="gray.400"
      pb="10px"
      style={{
        backgroundColor: '#e5e5f7',
        opacity: '0.8',
        backgroundImage:
          'linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, #e5e5f7 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        px={'12px'}
        style={{
          width: '100%',
          position: 'sticky',
          top: '0',
        }}
      >
        <Image
          borderRadius="full"
          boxSize="100px"
          objectFit="cover"
          src="https://unavatar.io/twitter/sseraphini"
          alt="Sibelius Seraphini"
          m="3"
        />

        <Flex
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          overflow="hidden"
          p="7"
          flexDirection="column"
          bg="white"
          width={'100%'}
          minW={'300px'}
          maxW={'430px'}
        >
          <TweetComposer />
          <ActionButtons />
          <DonateEth />
          <DonateSol />
          <DonatePix />
          <SessionProvider>
            <TwitterLogin />
          </SessionProvider>
        </Flex>
      </Flex>
    </Flex>
  );
};
