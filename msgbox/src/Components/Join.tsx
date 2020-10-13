import React,{useState} from 'react';
import { Link } from 'react-router-dom';
// import './Join.css'

const Join = () => {
  const [ name, setName ] = useState<string>('');
  const [ room, setRoom ] = useState<string>('');
  return(
    <div className="join-outer-container">
      <div className="join-inner-conatainer">
        <h1 className="heading">Join</h1>
        <div><input placeholder="Name" className="join-input" type="text" onChange= {event => setName(event.target.value)}/></div>
        <div><input placeholder="Room" className="join-input mt-20" type="text" onChange= {event => setRoom(event.target.value)}/></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
    
  )
}

export default Join;