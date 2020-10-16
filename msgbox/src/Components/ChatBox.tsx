import React, { KeyboardEvent, useState } from 'react';
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

  const dispatch = useDispatch();

  const dispatchMessage = (event: KeyboardEvent) => {
    event.preventDefault();
    if(message !== '') {
      dispatch({type:"ADD_MSG_CHAT", payload: message });
      setMessage('');
    }
  }
  console.log(messages)
  return(
    <div className = "chatBox-wrapper">
      <div className="chatBox-header">
        {/* <h3>hi</h3> */}
      </div>
      <div className="chatBox-body">
        {messages.map(item => <div className="chatBox-body-text">
          <p>{item.user}:{item.text}</p>
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