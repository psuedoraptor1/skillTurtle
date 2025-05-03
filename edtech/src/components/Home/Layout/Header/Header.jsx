import {Flex,  Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../../../ColorModeSwitcher';
import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from "react-icons/ri"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GiTurtle } from "react-icons/gi";
import { logout } from '../../../../redux/actions/user';

const LinkButton=({url='/',title="Home",onClose})=>
(
<Link onClick={onClose} to={url}>
    <Button variant={"ghost"}>{title} </Button></Link>
    );


const Header = ({isAuthenticated=false, user}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();

// const isAuthenticated=false;

const dispatch=useDispatch();

const logoutHandler= ()=>{
    console.log('Logout');
    onClose();
    dispatch(logout());
}


    return (
    <>
    <ColorModeSwitcher />

    <Button onClick={onOpen} colorScheme={'yellow'} width="12" height={'12'} zIndex={'overlay'} rounded="full" position={'fixed'} top="6" left="6">
        <RiMenu5Fill />
    </Button>
<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
<DrawerOverlay backdropFilter={"blur(.5px)"}/>
<DrawerContent>
<DrawerHeader borderBottomWidth="1px">
  <Flex align="center" gap={2}>
    Skill Turtle <GiTurtle />
  </Flex>
</DrawerHeader>

<DrawerBody>
<VStack spacing={"3"} alignItems="flex-start">
   <LinkButton onClose={onClose} url="/" title="Home"  />

   { user  && <LinkButton onClose={onClose} url="/courses" title="Browse All Courses"  /> }

   <LinkButton onClose={onClose} url="/contact" title="Contact Us"  />

   <LinkButton onClose={onClose} url="/about" title="About Us"  />
<HStack justifyContent={"space-evenly"}
position="absolute" bottom={"2rem"} width="80%">

{isAuthenticated?(
<>
<VStack>


<HStack>
<Link onClick={onClose} to="/profile">
<Button variant={"ghost"} colorScheme={"yellow"}>
    Profile
</Button>
</Link>

<Button variant={"ghost"} onClick={logoutHandler}>
    <RiLogoutBoxLine />
    Logout
</Button>

</HStack>
{
  user  && user.role==="admin" && <Link onClick={onClose} to="/admin/dashboard">
<Button colorScheme={"purple"} variant="ghost">
    <RiDashboardFill style={{margin:'4px'}} />Dashboard
</Button>

  </Link>
}

</VStack>
</>
):(
<>
<Link onClick={onClose} to="/login">
<Button colorScheme={"yellow"}>
    Login
</Button>
</Link>
</>)}


</HStack>
</VStack>
</DrawerBody> 
</DrawerContent>
</Drawer>

    </>
    );
};
export default Header;

