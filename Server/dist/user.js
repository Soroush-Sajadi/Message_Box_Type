"use strict";
// const { use } = require("./router");
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.removeUser = exports.addUser = void 0;
// interface Error {
//     error: string
// }
const users = [];
// change the return type
exports.addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const excistingUser = users.find(userr => userr.room === room && userr.name === name);
    if (excistingUser) {
        return { error: 'Username is taken' };
    }
    const user = { id, name, room };
    users.push(user);
    return { user };
};
exports.removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
exports.getUser = (id) => users.find(user => user.id === id);
const getUsersInRoom = (room) => users.filter(user => user.room === room);
// const addMember = (name, room) => {
//     const excistingUser = members.find(user => user.room === room && user.name === name);
//     if (excistingUser) {
//         return {err: 'Username is taken'}
//     }
//     const newMember = { name, room }
//     members.push(newMember)
//     return{members}
// }
//# sourceMappingURL=user.js.map