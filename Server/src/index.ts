"use strict"
import { Request, Response, Application } from 'express';
import socketio from "socket.io";
import http from 'http';
import express = require('express');
import router from './route';
import { Socket } from 'dgram';
import { addUser, getUser, removeUser, addChat, getChats, getNumberOfMembers }  from './user';


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
    // const id: string = `${Math.floor(Math.random( ) * 10000000000000)}`
    const {error, user}  = addUser({id:socket.id, name, room});
    // tslint:disable-next-line:no-console
    // console.log(user)


    if (error) return socket.emit('joinMessage', {user: 'admin', text: 'false'});
    const allMessages = getChats(user.room);
    const numberOfMembers = getNumberOfMembers(user.room)
    socket.emit('joinMessage', {user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('joinMessage', {user: 'admin', text: `${user.name} has joined`});
    socket.emit('getPreviousMessages',allMessages);
    socket.emit('getNumberOfMembers', numberOfMembers);
    socket.broadcast.to(user.room).emit('getNumberOfMembers', numberOfMembers);
    socket.join(user.room);
    callback()
  })

  socket.on('sendMessage', (message: string) => {
  const user = getUser(socket.id);
  addChat(user.room, {user:user.name, text:message })
  io.to(user.room).emit('message', {user: user.name, text: message });
  })

  socket.on('disconnect', () => {
    const user = getUser(socket.id);
    if (user !== undefined) {
      socket.broadcast.to(user.room).emit('disconnectMember', {user: 'admin', text: `${user.name} has disconnected `});
    }
    removeUser(socket.id);
  // tslint:disable-next-line:no-console
  })
});

server.listen(PORT,
  // tslint:disable-next-line:no-console
  () => console.log(`Server has started on port ${PORT}`))