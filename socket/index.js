const io=require('socket.io')(8900,{
    cors:{
        orgin:"http://localhost:3000"
    }
});

let users=[];

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId==userId) && users.push({userId,socketId});
}

const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId);
}

const getUser = (userId) => {
    console.log(userId)
    return users.find((user) => user.userId === userId);
  };

io.on("connection",(socket)=>{
    console.log("new user connected");
    socket.on("addUser",(userId)=>{
       addUser(userId,socket.id);
       io.emit('getUsers',users);
    })

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text
        });
      });



    socket.on("removeUser",()=>{
        console.log("User Disconnected");
        removeUser(socket.id);
        io.emit('getUsers',users);
    })
})
