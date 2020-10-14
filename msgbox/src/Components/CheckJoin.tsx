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
  const [ message, setMessage ] = useState<string>('')
  const [ messages, setMessages ] = useState<JoinMessage[]>([])

  const name = useSelector <JoinState, JoinState["newUser"]>(state => state.newUser)[0][0]
  const room = useSelector <JoinState, JoinState["newUser"]>(state => state.newUser)[0][1]
  const ENDPOINT: string = 'localhost:5000';
  
  useEffect(() =>  {
    socket = io(ENDPOINT)   
    // setName(newUser[0][0]);
    // setRoom(newUser[0][1]);
   
    socket.emit('join', {name, room}, () => {
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  },[ name, room]);
  useEffect(() => {
    console.log('work')
    socket.on('message', (message:JoinMessage) => {
        setMessages([...messages, message])
    })

  },[messages, message, room]);
  useEffect(() => {
    if (message) {
        socket.emit('sendMessage' , message, () => setMessage(''))
    }
  },[message, name, room])

  console.log(messages)
  
  return(
    <>
      {messages.length !== 0 ? messages[0].text === 'false' ? <p> This user is taken</p> : <Redirect to={`/chat?name=${name}&room=${room}`}/>: null}
    </>
  )
}

export default CheckJoin;