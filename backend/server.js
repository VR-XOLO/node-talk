const express = require("express");
const dotenv = require("dotenv");
const path = require("path")
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");   
const chatRoutes = require("./routes/chatRoutes");   
const messageRoutes = require("./routes/messageRoutes");   
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();  
const app = express();
const PORT = process.env.PORT;
app.use(express.json())


 app.use('/api/user', userRoutes)
 app.use('/api/chat', chatRoutes)
 app.use('/api/message', messageRoutes)
//  app.use(notFound)
//  app.use(errorHandler)
  
//  deployment code
           
  const __dirname1 = path.resolve();
         
  
    app.use(express.static(path.join(__dirname1, "/frontend/dist")));
  
    app.get("*", (req, res) =>{
      res.sendFile(path.join(__dirname1, "frontend", "dist", "index.html"))
    });

    

      
//  deployment code 


 const server = app.listen(PORT || 3000, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const io = require("socket.io")(server,{
  pingTimeout : 60000,
  cors : {
    origin : "http://localhost:5173",
  },
})

io.on("connection",(socket)=>{
  console.log("connected to socket.io");

 socket.on("setup", (userData)=>{
  socket.join(userData._id)  
  console.log(userData._id)
  socket.emit("connected")
 })  
 socket.on("join chat", (room) => {
  socket.join(room);
  console.log("User Joined Room: " + room);
});

socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

socket.on("new message", (newMessageRecieved) => {
  var chat = newMessageRecieved.chat;

  if (!chat.users) return console.log("chat.users not defined");

  chat.users.forEach((user) => {
    if (user._id == newMessageRecieved.sender._id) return;

    socket.in(user._id).emit("message recieved", newMessageRecieved);
  });
});

socket.off("setup", () => {
  console.log("USER DISCONNECTED");
  socket.leave(userData._id);
});

})
  