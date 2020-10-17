"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberOfMembers = exports.getChats = exports.addChat = exports.getUser = exports.removeUser = exports.addUser = exports.usersChat = void 0;
const users = [];
exports.usersChat = [];
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
exports.addChat = (room, message) => {
    if (exports.usersChat.length !== 0) {
        exports.usersChat.forEach(item => {
            if (item.room === room) {
                item.messages.push(message);
            }
        });
        return exports.usersChat;
    }
    exports.usersChat.push({ room, messages: [message] });
    return exports.usersChat;
};
exports.getChats = (room) => {
    let res = [];
    exports.usersChat.map(item => {
        if (item.room === room) {
            res = item.messages;
        }
    });
    return res;
};
exports.getNumberOfMembers = (room) => {
    let num = 0;
    users.map(item => {
        if (item.room === room) {
            num = num + 1;
        }
    });
    return num;
};
// tslint:disable-next-line:no-console
// const getUsersInRoom = (room: string) => users.filter(user=> user.room === room);
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