import React,{ useState, useEffect} from 'react';
import ChatRender from './ChatRender';
import ChatBox from './ChatBox'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import {RootState} from '../Redux/store'


let socket: any;

interface Messages {
  user: string
  text: string
}

interface Message {
  text: string
}

const messagesInitilaState = {
  user:'',
  text:''
}

const Chat = () => {
  const [ joinMessage, setJoinMessage ] = useState('');
  const name = useSelector <any>(state => (state.joinReducer.newUser)[0][0]);
  const room = useSelector <any>(state => (state.joinReducer.newUser)[0][1]);
  const message = useSelector <any>(state => state.messageReducer);
  // const messages: Messages[] = useSelector ((state: RootState)  => state.chatReducer);
  const ENDPOINT: string = 'localhost:5000';
  const dispatch = useDispatch();

  useEffect(() =>  {
      socket = io(ENDPOINT)
      socket.emit('join', {name, room}, () => {
        dispatch({type:"OWNER", payload: name})
      });
      return () => {
        socket.emit('disconnect');
        socket.off();
      }
  },[name, room]);


  useEffect(() => {
    socket.on('joinMessage', (message: Messages) => {
      setJoinMessage(message.text)
      if (message.text !== 'false') {
        getPreviousMessages()
        dispatch({type:"ADD_MSGS_CHAT", payload: message })
      }
    })
  },[name, room]);

  const getPreviousMessages = () => {
    socket.on('getPreviousMessages', (messages: Messages[]) => {
      if (messages.length !== 0) {
        messages.map(item => {
          dispatch({type:"ADD_MSGS_CHAT", payload: item })
        })
      }
      // console.log(messages)
    //   setJoinMessage(message.text)
    //   if (message.text !== 'false') {
    //     dispatch({type:"ADD_MSGS_CHAT", payload: message })
    //   }
    // })
  })}
    
  


  useEffect(() => {
      socket.on('message', (message: Messages) => {
        dispatch({type:"ADD_MSGS_CHAT", payload:  message })
    }) 
  },[]);

  useEffect(() => {
    if (message !== '') {
      socket.emit('sendMessage' , message);
      dispatch({type:"ADD_MSG_CHAT", payload: '' });
    }
  },[message])

  return(
      <div className="container">
        { joinMessage === 'false'  ? <Redirect to="/" /> : <ChatBox /> }
      </div>
  )
}

export default Chat;
