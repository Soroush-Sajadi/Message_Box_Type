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
        const { error, user } = user_1.addUser({ id: socket.id, name, room });
        // tslint:disable-next-line:no-console
        console.log(user);
        if (error)
            return callback(error);
        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` });
        socket.join(user.room);
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = user_1.getUser(socket.id);
        // tslint:disable-next-line:no-console
        console.log(user);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });
    socket.on('disconnect', () => {
        // tslint:disable-next-line:no-console
        console.log('user just left');
    });
});
server.listen(PORT, 
// tslint:disable-next-line:no-console
() => console.log(`Server has started on port ${PORT}`));
//# sourceMappingURL=index.js.map