import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../Redux/store';
import Chat from './SoketIo';
import '../Style/JoinInput.css'

const JoinInput = () => {
  const [ userOnChange, setUserOnChange ] = useState('');
  const [ roomOnChange, setRoomOnChange ] = useState('');
  const [ user, setUser ] = useState('');
  const [ room, setRoom ] = useState('');
  const dispatch = useDispatch();
  
  const accountIsTaken = useSelector((state: RootState ) => state.accountErrorHandlerReducer)

  const dispatchNewUser = (e: React.MouseEvent) => {
    if (userOnChange !== '' && roomOnChange !== '' ) {
      e.preventDefault()
      dispatch({type:"JOIN_USER", payload: {name:userOnChange, room: roomOnChange}})
      setUser(userOnChange);
      setRoom(roomOnChange)
      setUserOnChange('');
      setRoomOnChange('');
      dispatch({type:"ERROR", payload: false})
    }
  }
  console.log(accountIsTaken)
  return(
   <>
    <div className="join-outer-container">
      <div className="join-inner-conatainer">
        <h1 className="heading">Join</h1>
        <div><input placeholder="Name" value={userOnChange} className="join-input-name" type="text" onChange= {event => setUserOnChange(event.target.value)}/></div>
        <div><input placeholder="Room" value={roomOnChange}  className="join-input-room" type="text" onChange= {event => setRoomOnChange(event.target.value)}/></div>
        <button onClick={dispatchNewUser} className="button mt-20" type="submit">Sign In</button>
          {accountIsTaken ? <p>Account Is Taken</p>: null}
        {user !== '' && room !== '' ? <Redirect  to={`/chat`}/>: null}
      </div> 
  </div>
   </>
  )
}

export default JoinInput; 