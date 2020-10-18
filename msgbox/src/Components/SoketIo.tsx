import React,{ useState, useEffect} from 'react';
import ChatBox from './ChatBox'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../Redux/store'

let socket: any;
interface Message {
  user: string
  text: string
}

const Chat = () => {
  const [ joinMessage, setJoinMessage ] = useState('');
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
        socket.close();
        socket.emit('disconnect');

      }
  },[name, room]);


  useEffect(() => {
    socket.on('joinMessage', (message: Message) => {
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
    socket.on('getPreviousMessages',(messages: Message[]) => {
         messages.map(async item => {
          await dispatch({type:"ADD_MSGS_CHAT", payload: item })
        })
  })};

  useEffect(() => {
    socket.on('getNumberOfMembers',(message: number) => {
      console.log(message)
      dispatch({type:"MEMBER_COUNTER", payload: message })
    })
  },[]);
  
  useEffect(() => {
      socket.on('message', (message: Message) => {
        dispatch({type:"ADD_MSGS_CHAT", payload:  message })
    }) 
  },[]);

  useEffect(() => {
    if (message !== '') {
      socket.emit('sendMessage' , message);
      dispatch({type:"ADD_MSG_CHAT", payload: '' });
    }
  },[message]);

  useEffect(() => {
    socket.on('disconnectMember',(message: Message) => {
      dispatch({type:"ADD_MSGS_CHAT", payload: message })
    })
  },[])

  return(
      <div className="container">
        { joinMessage === 'false'  ?  <Redirect to="/" /> : <ChatBox /> }
        { name === '' || room === '' ? <Redirect to="/" />: null} 
      </div>
  )
}

export default Chat;