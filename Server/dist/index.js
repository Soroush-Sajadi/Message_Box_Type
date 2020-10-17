"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const express = require("express");
const route_1 = __importDefault(require("./route"));
const user_1 = require("./user");
const app = express();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
app.use(route_1.default);
io.on("connection", (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        // const id: string = `${Math.floor(Math.random( ) * 10000000000000)}`
        const { error, user } = user_1.addUser({ id: socket.id, name, room });
        // tslint:disable-next-line:no-console
        // console.log(user)
        if (error)
            return socket.emit('joinMessage', { user: 'admin', text: 'false' });
        const allMessages = user_1.getChats(user.room);
        const numberOfMembers = user_1.getNumberOfMembers(user.room);
        // tslint:disable-next-line:no-console
        console.log('its me', numberOfMembers);
        socket.emit('joinMessage', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('joinMessage', { user: 'admin', text: `${user.name} has joined` });
        socket.emit('getPreviousMessages', allMessages);
        socket.emit('getNumberOfMembers', numberOfMembers);
        socket.broadcast.to(user.room).emit('getNumberOfMembers', numberOfMembers);
        socket.join(user.room);
        callback();
    });
    socket.on('sendMessage', (message) => {
        const user = user_1.getUser(socket.id);
        user_1.addChat(user.room, { user: user.name, text: message });
        // tslint:disable-next-line:no-console
        // console.log(JSON.stringify(y))
        io.to(user.room).emit('message', { user: user.name, text: message });
    });
    socket.on('disconnect', () => {
        user_1.removeUser(socket.id);
        // tslint:disable-next-line:no-console
        console.log('user just left');
    });
});
server.listen(PORT, 
// tslint:disable-next-line:no-console
() => console.log(`Server has started on port ${PORT}`));
//# sourceMappingURL=index.js.map