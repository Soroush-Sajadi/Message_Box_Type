"use strict"
import { Request, Response, Application } from 'express';
import socketio from "socket.io";
import http from 'http';
import express = require('express');
import router from './route';
import { Socket } from 'dgram';
import { addUser }  from './user';


const app: Application = express();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app)
const io = socketio(server);

interface Information {
  id: string
  name: string
  room: string
}
interface Error {
  error: string
}

app.use(router);
io.on("connection", (socket: any) => {
  socket.on('join', ({ name , room }: any , callback: any)  => {
    const {error, user}  = addUser({id:`${Math.floor(Math.random()* 100000000000000)}`, name, room});
    // tslint:disable-next-line:no-console
    console.log(user)


    if (error) return callback(error);
    socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});

    socket.join(user.room);
    callback()
})
});

server.listen(PORT,
  // tslint:disable-next-line:no-console
  () => console.log(`Server has started on port ${PORT}`))