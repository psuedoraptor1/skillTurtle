import { Avatar, Box, Container, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import introVideo from '../../../assets/videos/introd.mp4';
import { useColorModeValue } from '@chakra-ui/react';
import termsAndCondition from '../../../assets/docs/termsAndCondition';
import introVideoDark from '../../../assets/videos/darkintrod.mp4';
import SkillTurtleWithBG from '../../../assets/images/SkillTurtleWithBG.jpg'
//INTRO VIDEO HERE

const Founder=()=>(
    <Stack direction={['column', 'row']} spacing={['4', '8']} padding={'8'} >
        <VStack>
       <Avatar src= { SkillTurtleWithBG } boxSize={['40','48']} />
</VStack>

<VStack justifyContent={'center'} alignItems={['center','flex-start']}>
  <Heading children="Skill Turtle"   size={['md','xl']} />
  <Text textAlign={['center','left']} children={`At Skill Turtle, we are dedicated to help you gain industry-ready skills through the best resources and experienced professionals who have thrived in challenging times ensuring you stand out and succeed in your career. `} />
</VStack>

</Stack>
)

const VideoPlayer= ()=> (
    <Box>
        { 
            useColorModeValue('dark', 'light') === 'dark' ?
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
    </Box>
)
const TandC= ({termsAndCondition})=>(
    <Box>
        <Heading size={"md"} children="Terms & Conditions" textAlign={["center","left"]} my='4' py="24px"/>

        <Box h="sm" p="4" overflowY={'scroll'}>
        <Text fontFamily={'heading'} letterSpacing={"widest"} textAlign={["center","left"]} whiteSpace="pre-line" >{termsAndCondition}</Text>  
        <Heading my={'4'} size={'xs'} children="We encourage only serious learners and reserve the right to discontinue participation if a lack of commitment is observed." />

        </Box>
    </Box>
)

const About = () => {
  return <Container maxW={'container.lg'} 
  padding="16" boxShadow={'lg'}
  >
<Founder />
<Stack m="8" direction={['column','row']} alignItems="center">
    <Text  fontFamily={'cursive'} m='8'textAlign={['center','left']}>
        We don’t just teach, we guide, mentor, and micromanage your learning journey. Instead of reinventing the wheel, we help you navigate the best resources. Learn smarter, not harder, and stand out where it matters!
    </Text>
</Stack>
<VideoPlayer />
<TandC m="8" termsAndCondition = {termsAndCondition}/>
  </Container>
};

export default About