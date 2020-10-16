import React,{ useState, useEffect} from 'react';
import ChatRender from './ChatRender';
import ChatBox from './ChatBox'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom'

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
  const message = useSelector <any>(state => state.messageReducer)
  // const messages = useSelector <any>(state => state.chatReducer)
  // const [ messages, setMessages ] = useState<Messages[]>([]);
  const ENDPOINT: string = 'localhost:5000';
  const dispatch = useDispatch();

  useEffect(() =>  {
      socket = io(ENDPOINT)
      socket.emit('join', {name, room}, () => {
      });
      return () => {
        socket.emit('disconnect');
        socket.off();
      }
  },[name, room]);

  useEffect(() => {
    socket.on('joinMessage', (message: Messages) => {
      // console.log('are u here again!')
      setJoinMessage(message.text)
      if (message.text !== 'false') {
        dispatch({type:"ADD_MSGS_CHAT", payload: message })
      }
    })
  },[name, room]);

  useEffect(() => {
      socket.on('message', (message: Messages) => {
        dispatch({type:"ADD_MSGS_CHAT", payload:  message })
    }) 
  },[]);

  useEffect(() => {
    if (message !== '') {
        socket.emit('sendMessage' , message)
    }
  },[message])
  


  // const sendChat = (event: React.KeyboardEvent) => {
  //   event.preventDefault();
  //   if (onChangeText !== '') {
  //     setMessage(onChangeText)
  //   }
    
  // }

  // const chat = useSelector <any>(state => state.chatReducer)
  // const dispatch = useDispatch();

  // const saveChat = (user: string, text:string) => {
  //   dispatch({type:"ADD_MSG_CHAT", payload: {user:user,text: text}})
  //   // dispatch({type:"JOIN_USER", payload: newRoom})
  // }
  return(
      <div className="container">
        { joinMessage === 'false'  ? <Redirect to="/" /> : <ChatBox /> }
      </div>
  )
}

export default Chat;

{/*     
        <input 
          value={newMessage} 
          onChange={event => setNewMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event): null}
          />
        { messages.map((item, i) => item.text === 'false' ? <p key={i}>nooooo</p>: null)} */}