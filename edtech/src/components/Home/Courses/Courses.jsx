import { Button, Checkbox, Container, Heading, HStack, VStack, Stack, Text, Box, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllCourses } from '../../../redux/actions/course'
import {toast} from 'react-hot-toast'
import {addToPlaylist} from "../../../redux/actions/profile"
import Loader from '../../Home/Layout/Loader/Loader'

const Course=({
  title, id, status, levelUpdateHandler, loading
})=>{
    const [levels, setLevels] = useState({
      level1: status.level1,
      level2: status.level2,
      level3: status.level3,
    });
  
    const handleChange = (level) => (e) => {
      setLevels({ ...levels, [level]: e.target.checked });
      levelUpdateHandler(id, level, e.target.checked);
    };
  
    const bg = useColorModeValue('white', 'gray.800');
    const border = useColorModeValue('gray.200', 'gray.700');

  return(
    <>
    {
      loading ? (
        <Loader />) : (
          <VStack className='course' alignItems={["center","flex-start"]}>
          {/* <Text noOfLines={2} children={description} /> */}
          <Stack direction={["column","row"]} alignItems="center">
          <Box
                  maxW="sm"
                  mx="auto"
                  p={6}
                  borderRadius="2xl"
                  boxShadow="lg"
                  bg={bg}
                  border="1px solid"
                  borderColor={border}
                >
                  <Text fontSize="xl" mb={4} fontWeight="bold" textAlign="center">
                    {title}
                  </Text>
            
                  <VStack align="start" spacing={4}>
                    <Checkbox
                      isChecked={levels.level1}
                      onChange={handleChange('level1')}
                      colorScheme="teal"
                      size="lg"
                    >
                      Level 1
                    </Checkbox>
            
                    <Checkbox
                      isChecked={levels.level2}
                      onChange={handleChange('level2')}
                      colorScheme="teal"
                      size="lg"
                    >
                      Level 2
                    </Checkbox>
            
                    <Checkbox
                      isChecked={levels.level3}
                      onChange={handleChange('level3')}
                      colorScheme="teal"
                      size="lg"
                    >
                      Level 3
                    </Checkbox>
                  </VStack>
                </Box>
          </Stack>
          </VStack>
          )
        }
      </>
    );
}

const Courses = () => {
   const [category, setCategory]=useState("Data Structures And Algorithms");
   const dispatch=useDispatch();

   const levelUpdateHandler=async (courseId, level, status)=>{
      await dispatch(addToPlaylist(courseId, level, status));
    };

    const categories=["Data Structures And Algorithms", "Web Development", "Core Subjects", "System Sesign", "Off-campus", "Others"]
    const {courses,loading,error,message}=useSelector(state=>state.course)
    useEffect(() => {
      dispatch(getAllCourses(encodeURIComponent(category)));
  
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
  
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
    }, [category,dispatch,error,message ]);
  


  return (<Container minH={"95vh"} maxW="container.lg" paddingY={'8'}>
<Heading children="All Courses" m={'8'} />
 <HStack overflowX={"auto"} paddingY="8" css={{"&::-webkit-scrollbar":{display:"none"}}}>
  {
    categories.map((item,index)=>(
      <Button key={index} onClick={()=>setCategory(item)} minW={'60'}>
    <Text children={item} />
  </Button>
    ))
  }
 </HStack>

 <Stack  direction={["column","row"]}
 flexWrap="wrap"
 justifyContent={["flex-start","space-evenly"]}
 alignItems={['center','flex-start']}
 >
     {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.topic}
              status={item.levels}
              id={item._id}
              levelUpdateHandler={levelUpdateHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading opacity={'.5'} mt="4" children="No Course Exists in this Category" />
          
        )}
 </Stack>
  </Container>);
}

export default Courses