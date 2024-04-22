import React, { useEffect } from "react";
import Login from "../components/Auth/Login"
import Signup from "../components/Auth/Signup"
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/context/chatProvider";

const Home = () => {
  const history = useNavigate()

   const {setUser} =  ChatState();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
    
        if (!userInfo) history("/");
      }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        display = {"flex"}
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m={"20px 0 15px 0"}
        borderRadius={"1g"}
        borderWidth={"1px"}
      >
        <Text
          fontSize={"4xl"}
          fontFamily={"Poppins"}
          color={"black"}
          textAlign={"center"}
        >
          NodeTalk
        </Text>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant={"soft-rounded"} colorScheme="green">
          <TabList mb={"1em"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                 <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
           
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
