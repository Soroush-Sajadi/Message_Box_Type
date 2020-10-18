import React,{ useState, useEffect} from 'react';
import ChatBox from './ChatBox'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../Redux/store';
import { Message } from '../Redux/chatReducer';

let socket: any;
// interface Message {
//   user: string
//   text: string
// }

const SocketIo = () => {
  const name: string = useSelector ((state:RootState) => state.joinReducer.name);
  const room: string = useSelector ((state:RootState) => (state.joinReducer.room));
  const message: string = useSelector ((state:RootState) => state.messageReducer);
  const accountIsTaken = useSelector((state: RootState ) => state.accountErrorHandlerReducer)
  const dispatch = useDispatch();
  const ENDPOINT: string = 'localhost:5000';


  useEffect(() =>  {
      socket = io(ENDPOINT)
      socket.emit('join', {name, room}, () => {
      });

      return () => {
        socket.close();
        socket.emit('disconnect');
      }

  },[name, room]);


  useEffect(() => {
    socket.on('joinMessage', (message: Message) => {
      if (message.text !== 'false') {
        dispatch({type:"OWNER", payload: name})
        getPreviousMessages()
        dispatch({type:"ADD_MSGS_CHAT", payload: message })
      } else{
        dispatch({type:"ERROR", payload: true})
      }
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
      <div>
        { accountIsTaken ?  <Redirect to="/" /> : <ChatBox /> }
        { name === '' || room === '' ? <Redirect to="/" />: null} 
      </div>
  )
}

export default SocketIo;