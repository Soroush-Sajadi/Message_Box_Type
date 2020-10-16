import React, { KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Style/ChatBox.css'

const ChatBox = () => {
  const [ message, setMessage ] = useState('');
  const messages = useSelector <any>(state => state.chatReducer)

  const dispatch = useDispatch();

  const dispatchMessage = (event: KeyboardEvent) => {
    event.preventDefault();
    if(message !== '') {
      dispatch({type:"ADD_MSG_CHAT", payload: message })
    }
  }
  console.log(messages)
  return(
    <div className = "chatBox-wrapper">
      <div className="chatBox-header">
        {/* <h3>hi</h3> */}
      </div>
      <div className="chatBox-body">
        
      </div>
      <div className="chatBox-bottom">
      <input type="text" value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? dispatchMessage(event): null}
      />
      </div>
    </div>
  )
}

export default ChatBox;