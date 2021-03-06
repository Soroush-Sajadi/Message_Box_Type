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
    socket.on('join', ({ name, room }) => {
        const { error, user } = user_1.addUser({ id: socket.id, name, room });
        if (error)
            return socket.emit('joinMessage', { user: 'admin', text: 'false' });
        const allMessages = user_1.getChats(user.room);
        const numberOfMembers = user_1.getNumberOfMembers(user.room);
        socket.emit('joinMessage', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('joinMessage', { user: 'admin', text: `${user.name} has joined` });
        socket.emit('getPreviousMessages', allMessages);
        socket.emit('getNumberOfMembers', numberOfMembers);
        socket.broadcast.to(user.room).emit('getNumberOfMembers', numberOfMembers);
        socket.join(user.room);
    });
    socket.on('sendMessage', (message) => {
        const user = user_1.getUser(socket.id);
        user_1.addChat(user.room, { user: user.name, text: message });
        io.to(user.room).emit('message', { user: user.name, text: message });
    });
    socket.on('disconnect', () => {
        const user = user_1.getUser(socket.id);
        user_1.removeUser(socket.id);
        if (user !== undefined) {
            const numberOfMembers = user_1.getNumberOfMembers(user.room);
            socket.broadcast.to(user.room).emit('disconnectMember', { user: 'admin', text: `${user.name} has disconnected ` });
            socket.broadcast.to(user.room).emit('getNumberOfMembers', numberOfMembers);
        }
    });
});
server.listen(PORT, 
// tslint:disable-next-line:no-console
() => console.log(`Server has started on port ${PORT}`));
//# sourceMappingURL=index.js.map