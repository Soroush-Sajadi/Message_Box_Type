import React, { KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <>
      <input type="text" value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? dispatchMessage(event): null}
      />
    </>
  )
}

export default ChatBox;