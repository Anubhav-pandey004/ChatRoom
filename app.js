const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const path=require("path");
const app = express();
const server = createServer(app);
const io = new Server(server);
const cors= require('cors');
app.use(cors({
    origin:"https://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

const users={};
io.on("connection",(socket)=>{   //socket is instance of a indivisual socket
    socket.on("new-user-joined",(name)=>{
        console.log(name,"joined");
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    });
    socket.on("send",(message)=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    socket.on("disconnect",(message)=>{
        socket.broadcast.emit('leave',users[socket.id])
        delete users[socket.id];
    })
});
server.listen(8080,()=>{
    console.log("Server is listing");
});
