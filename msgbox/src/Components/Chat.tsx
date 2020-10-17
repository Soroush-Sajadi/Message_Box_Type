import React,{ useState, useEffect} from 'react';
import ChatRender from './ChatRender';
import ChatBox from './ChatBox'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../Redux/store'

let socket: any;
interface Messages {
  user: string
  text: string
}

const Chat = () => {
  const [ joinMessage, setJoinMessage ] = useState('');
  const [ memberCounter, setMemberCounter ] = useState(0);
  const name: string = useSelector ((state:RootState) => state.joinReducer.name);
  const room: string = useSelector ((state:RootState) => (state.joinReducer.room));
  const message: string = useSelector ((state:RootState) => state.messageReducer);
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
      // const joinMessage = message.text.split(' ');
      // if (joinMessage[ joinMessage.length - 1 ] === 'joined') {
      //   console.log(memberCounter)
      //   setMemberCounter (memberCounter + 1);
      // }
    })
  },[name, room]);

  const getPreviousMessages = () => {
    socket.on('getPreviousMessages',(messages: Messages[]) => {
      if (messages.length !== 0) {
         messages.map(async item => {
          await dispatch({type:"ADD_MSGS_CHAT", payload: item })
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
    socket.on('getNumberOfMembers',(message: number) => {
      console.log(message)
      dispatch({type:"MEMBER_COUNTER", payload: message })
    })
  },[])
  
    
    
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
        { joinMessage === 'false'  ?  <Redirect to="/" /> : <ChatBox /> }
      </div>
  )
}

export default Chat;