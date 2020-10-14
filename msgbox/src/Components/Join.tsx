import React,{ useState } from 'react';
import AddUser from './AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { JoinState } from '../Redux/joinReducer';
// import './Join.css'

const Join = () => {
  const newUser = useSelector <JoinState, JoinState["newUser"]>(state => state.newUser)
  const dispatch = useDispatch();

  const addUser = (newName: string, newRoom:string) => {
    dispatch({type:"JOIN_USER", payload: [newName,newRoom]})
    // dispatch({type:"JOIN_USER", payload: newRoom})
  }
  // console.log(newUser)
  return(
   <>
    <AddUser addUser={addUser}  />

   </>
  )
}

export default Join;