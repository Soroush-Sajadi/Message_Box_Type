import React, { KeyboardEvent, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chat } from '../Redux/chatReducer';
import {RootState} from '../Redux/store'
import '../Style/ChatBox.css'

interface Messages {
  user: string
  text: string
}

const ChatBox = () => {
  const [ message, setMessage ] = useState('');
  const messages: Messages[] = useSelector ((state: RootState)  => state.chatReducer)
  const owner: string = useSelector((state: RootState) => state.ownerReducer);
  const numberOfMembers: number = useSelector((state: RootState) => state.numberOfMembersReducer)
  // console.log(numberOfMembers)
  const dispatch = useDispatch();
  const messagesEndRef  = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const dispatchMessage = (event: KeyboardEvent) => {
    event.preventDefault();
    if(message !== '') {
      dispatch({type:"ADD_MSG_CHAT", payload: message });
      setMessage('');
    }
  }
  useEffect(() => {
    scrollToBottom()
  },[messages])

  return(
    <div className = "chatBox-wrapper">
      <div className="chatBox-header">
        <h5>{numberOfMembers}members</h5>
        <h3>Welcome to My Chat Box!</h3>
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
    </div>
  )
}

export default ChatBox;