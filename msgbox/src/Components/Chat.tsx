import React,{ useState, useEffect} from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
let socket: any;
// interface Information {
//   name: string
//   room: string
// }
const Chat = ({location}: any) => {
  const [ name, setName ] = useState<string | null | string[]>('');
  const [ room, setRoom ] = useState<string | null | string[]>('');
  const ENDPOINT: string = 'localhost:5000';

  useEffect(() =>  {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT)
   
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
  }
    },[ENDPOINT, location.search])
  return(
    <div>
      Chat
    </div>
  )
}

export default Chat;