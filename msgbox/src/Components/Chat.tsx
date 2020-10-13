import React,{ useState, useEffect} from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';

let socket: any;
interface In {
  
}

const Chat = ({location}: any) => {
  const [ name, setName ] = useState<string | null | string[]>('');
  const [ room, setRoom ] = useState<string | null | string[]>('');
  const [ message, setMessage ] = useState<string>('')
  const [ messages, setMessages ] = useState<string[]>([])
  const [ newMessage, setNewMessage ] = useState<string >('')
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
  },[ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message:string) => {
        setMessages([...messages, message])
    })

  },[messages, message]);
  useEffect(() => {
    if (message) {
        socket.emit('sendMessage' , message, () => setMessage(''))
    }
  },[message])

  const sendMessage = (event: React.KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
    setMessage(newMessage)

  }
  console.log(messages)
  return(
      <div className="container">
        <input 
          value={newMessage} 
          onChange={event => setNewMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event): null}
          />
      </div>
  )
}

export default Chat;