import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

let socket: any;
interface Message {
  user: string
  text: string
}
interface saveChatProps {
  saveChat(user: string, text: string): void
}

const ChatRender: React.FC<saveChatProps> = ({saveChat}) => {
  const [ onChangeText, setOnChangeText ] = useState('');
  const [ message, setMessage ] = useState('');
  // const name = useSelector <any>(state => state.joinReducer.newUser[0][0])
  // const room = useSelector <any>(state => state.joinReducer.newUser[0][1])


  const ENDPOINT: string = 'localhost:5000';
  socket = io(ENDPOINT)
  // useEffect(() =>  {
  //   socket = io(ENDPOINT)   
  //   socket.emit('join', {name, room}, () => {
  //   });
  //   return () => {
  //     socket.emit('disconnect');
  //     socket.off();
  //   }
  // },[ name, room]);
  
  useEffect(() => {
    socket.on('message', (message:Message) => {
        saveChat( message.user, message.text)
    })

  },[message]);
  useEffect(() => {
    if (message) {
        socket.emit('sendMessage' , message, () => setMessage(''))
    }
  },[message])

  const sendChat = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (onChangeText !== '') {
      setMessage(onChangeText)
    }
    
  }
  // console.log(name)
  return(
    <div>
      <input type="text" placeholder="write message" 
        onChange= {event => setOnChangeText(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendChat(event): null}
        />
    </div>
  )
}

export default ChatRender;