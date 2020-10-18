import React, { KeyboardEvent, useState, useRef, useEffect, MouseEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../Redux/chatReducer';
import { RootState } from '../Redux/store';
import io from 'socket.io-client';
import ChatBoxIcon from '../Images/Chat.jpg';
import '../Style/ChatBox.css'

let socket: any

const ChatBox = () => {
  const [ message, setMessage ] = useState('');
  const [ disconnect, setDisconnect ] = useState(false)
  const messages: Message[] = useSelector ((state: RootState)  => state.chatReducer);
  const owner: string = useSelector((state: RootState) => state.ownerReducer);
  const numberOfMembers: number = useSelector((state: RootState) => state.numberOfMembersReducer);
  const dispatch = useDispatch();
  const messagesEndRef  = useRef<HTMLDivElement>(null);
  const ENDPOINT: string = 'localhost:5000';

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  };

  useEffect(() => {
    scrollToBottom()
  },[messages])

  const dispatchMessage = (event: KeyboardEvent) => {
    event.preventDefault();
    if(message !== '') {
      dispatch({type:"ADD_MSG_CHAT", payload: message });
      setMessage('');
    }
  }

  const getDisconnect = (event: MouseEvent) => {
    event.preventDefault();
    socket = io(ENDPOINT)
    setDisconnect(true);
    dispatch({type:"REMOVE_ALL_MESSAGES" })
    return () => {
      socket.close();
      socket.emit('disconnect');
      socket.off();
  
    }
   
  }
  
  return(
    <div className = "chatBox-wrapper">
      <div className="chatBox-header">
        <div className="chatBox-header-members">
          <p>{numberOfMembers} Members</p>
        </div>
        <div className="chatBox-header-icon">
          <img src={ChatBoxIcon} alt="Chat Box"/>
        </div>
        <div className="chatBox-header-signout" >
          <p onClick={getDisconnect}>Sign Out</p>
        </div>
      </div>
      <div className="chatBox-body">
        {messages.map((item, i) => <div key={i} ref={messagesEndRef}  className={item.user === "admin" ? "chatBox-body-text-admin": item.user === owner ? "chatBox-body-text-owner" :"chatBox-body-text"} >
      {item.user === 'admin' ? <p >{item.text}</p>:<div><p className="user">{item.user}</p><p className="text">{item.text}</p></div>
        }
        </div>)}
      </div>
      <div className="chatBox-bottom">
      <input  type="text" value={message} placeholder="Press Enter to Send Message"
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? dispatchMessage(event): null}
      />
      </div>
      {disconnect ? <Redirect to='/'/> : null}
    </div>
  )
}

export default ChatBox;