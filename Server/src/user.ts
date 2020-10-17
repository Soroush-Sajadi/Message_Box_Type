
interface UserInformation {
    id: string
    name: string
    room: string
}
const users: UserInformation[] = [];

interface UserMessage {
    user: string
    text: string
}

interface UsersChat {
        room: string
        messages: UserMessage[]
}
// const usersChat: UsersChat[] = [{room:'',[{user:"asdas",text:"sdasd"}]}];

export const usersChat: UsersChat[] = [];
// change the return type
export const addUser = ({id, name, room}: UserInformation) :any => {
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

export const removeUser = (id: string)  => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

export const getUser = (id: string) => users.find(user => user.id === id);

export const addChat = (room: string, message: UserMessage) => {
    if (usersChat.length !== 0) {
        usersChat.forEach(item => {
            if(item.room === room) {
                item.messages.push(message)
            }
        })
        return usersChat
    }
    usersChat.push({room,messages:[ message]})
    return usersChat
}

export const getChats = (room: string):UserMessage[]  => {
    let res:UserMessage[]  = []
        usersChat.map(item => {
            if(item.room === room) {
                res = item.messages
            }
        })
        return res
}

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

