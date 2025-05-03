import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'

import {TiSocialLinkedinCircular,TiSocialInstagramCircular} from "react-icons/ti"
import { FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return <Box padding={"4"} bg="blackAlpha.900" minH={'10vh'} mt={'8'}>
<Stack direction={["column","row"]}>
    <VStack alignItems={["center","flex-start"]}
    width="full">
<Heading children="All Rights Reserved" color={'white'}/>
<Heading
fontFamily={'body'}
size="sm"
children="@Skill Turle" color={'yellow.400'}/>

    </VStack>

    <HStack spacing={["2","10"]} justifyContent="center" 
    color={'white'}
    fontSize={'50'}>
<a href="https://www.linkedin.com/company/skillturtle/" target={'_blank'} rel="noreferrer" >
<TiSocialLinkedinCircular />
</a>
<a href="https://www.instagram.com/skill.turtle/" target={'_blank'} rel="noreferrer">
<TiSocialInstagramCircular />
</a>
<a href="https://chat.whatsapp.com/GxZiWUSUksW8fyzyCi6MYk" target={'_blank'} rel="noreferrer">
<FaWhatsapp />
</a>
    </HStack>
</Stack>
  </Box>
}

export default Footer
