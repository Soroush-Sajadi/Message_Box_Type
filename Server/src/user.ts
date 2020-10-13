// const { use } = require("./router");

// const users: string[] = [];
// const members = []

interface Information {
    id: string
    name: string
    room: string
}
// interface Error {
//     error: string
// }
const users: Information[] = [];

// change the return type
export const addUser = ({id, name, room}: Information) :any => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const excistingUser = users.find(userr => userr.room === room && userr.name === name);

    if (excistingUser) {
        return {error:'Username is taken'};
    }
    const user = { id, name, room }
    users.push(user)
    return { user }
};

const removeUser = (id: string)  => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id: string) => users.find(user => user.id === id);

const getUsersInRoom = (room: string) => users.filter(user=> user.room === room);


// const addMember = (name, room) => {
//     const excistingUser = members.find(user => user.room === room && user.name === name);
//     if (excistingUser) {
//         return {err: 'Username is taken'}
//     }
//     const newMember = { name, room }
//     members.push(newMember)
//     return{members}

// }

