import { ChatState } from "../components/context/chatProvider"
import { Box } from "@chakra-ui/layout";
import SliderDrawer from "../components/miscellenous/SliderDrawer";
import MyChats from "../components/miscellenous/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";
const Chats = () => {
       const {user} =   ChatState();
       const [fetchAgain, setFetchAgain] = useState(false)
    
  return (
    <div style={{ width: "100%" }}>
      {user && <SliderDrawer />}
      <Box display = {"flex"} justifyContent="space-between" w="100%" h="91.5vh" flexDirection={"column"} p="10px">
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        {user && (
          <ChatBox  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        <p></p>
      </Box>
    </div>  
  )
}

export default Chats