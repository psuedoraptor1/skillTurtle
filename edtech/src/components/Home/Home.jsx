import React from 'react';
import {
  Button,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
// import vg from '../../assets/images/final.png';
import vg from '../../assets/images/final.png'
import { useColorModeValue } from '@chakra-ui/react';
import introVideo from '../../assets/videos/introd.mp4'; 
import introVideoDark from '../../assets/videos/darkintrod.mp4';
//INTRO VIDEO HERE

const Home = (user) => {
  const selectedTheme = useColorModeValue('dark', 'light');

  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing="8"
          >
            <Heading  textTransform={'uppercase'}
           fontFamily={"mono"} textAlign="center"  children="Evolve Into a Professional" size={'xl'} />
            <Text
              fontSize={'xl'}
              fontFamily="cursive"
              textAlign={['center', 'left']}
              children="Build up your skills with us, effortlessly!"
            />
            { 
              user === undefined?
              ( 
                <Link to="/courses">
                <Button size={'lg'} colorScheme="yellow">
                  Let's Get Started
                </Button>
                </Link> 
              ) : (
                <Link to="/contact">
                <Button size={'lg'} colorScheme="yellow">
                  Let's Get Started
                </Button>
                </Link>
              )
            }
          </VStack>

          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={vg}
            objectFit="contain"
          />
        </Stack>
      </div>

      <div className="container2">
        { 
          selectedTheme === 'dark' ?
            <video
                autoPlay
                muted
                loop
                playsInline
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback 
                src={introVideo}
              ></video>
            :
              <video
                autoPlay
                muted
                loop
                playsInline
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback 
                src={introVideoDark}
              ></video>
          }
      </div>
    </section>
  );
};

export default Home;
