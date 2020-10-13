"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const express = require("express");
const route_1 = __importDefault(require("./route"));
const app = express();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
app.use(route_1.default);
io.on("connection", (socket) => {
    // tslint:disable-next-line:no-console
    console.log("a user connected");
});
server.listen(PORT, 
// tslint:disable-next-line:no-console
() => console.log(`Server has started on port ${PORT}`));
//# sourceMappingURL=index.js.map