import express from 'express';
import http from 'http';
import cors from 'cors';
import {Server} from 'socket.io'
const app = express();
app.use(cors());

const server = http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log(socket.id)
    console.log('CurrentUser:${socket.id}')

    socket.on('join_room',(data)=>{
        socket.join(data)
        console.log('User:${socket.id} Join Room: ${data}')
    })

    socket.on('disconnect',()=>{
        console.log('UserDisconnected',socket.id)
    })
})

server.listen(3001, () => {
    console.log('Server running on port 3001');
});