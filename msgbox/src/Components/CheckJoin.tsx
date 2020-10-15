import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { JoinState } from '../Redux/joinReducer';
import Chat from './Chat';
import { Redirect } from 'react-router-dom'


let socket: any
interface JoinMessage {
  user: string
  text: string
}
const CheckJoin = () => {
  const [ nasme, setName ] = useState<string | null | string[]>('');
  const [ rodom, setRoom ] = useState<string | null | string[]>('');
  const [ onChangeText, setOnChangeText ] = useState('');
  const [ message, setMessage ] = useState('')
  const [ messages, setMessages ] = useState<JoinMessage[]>([])

  const name = useSelector <any>(state => state.joinReducer.newUser[0][0])
  const room = useSelector <any>(state => state.joinReducer.newUser[0][1])
  const ENDPOINT: string = 'localhost:5000';

  useEffect(() =>  {
    socket = io(ENDPOINT)   
    socket.emit('join', {name, room}, () => {
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  },[ name, room]);
  useEffect(() => {
    socket.on('message', (message:JoinMessage) => {
        setMessages([...messages, message])
    })

  },[messages, message, room]);
  useEffect(() => {
    if (message) {
        socket.emit('sendMessage' , message, () => setMessage(''))
    }
  },[message, name, room])

  const sendChat = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (onChangeText !== '') {
      setMessage(onChangeText)
    }
    
  }
  
  return(
    <>
      {/* {messages.length !== 0 ? messages[0].text === 'false' ? <p> This user is taken</p> : <Redirect to={`/chat?name=${name}&room=${room}`}/>: null} */}
      <div>
      <input type="text" placeholder="write message" 
        onChange= {event => setOnChangeText(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendChat(event): null}
        />
    </div>
    {/* {message.text !== 'false'} */}
    </>
  )
}

export default CheckJoin;