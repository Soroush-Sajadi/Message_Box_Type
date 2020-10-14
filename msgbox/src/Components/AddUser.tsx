import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import CheckJoin from './CheckJoin';


interface NewUserProps {
  addUser(addName: string, addRoom: string): void
}

const AddUser: React.FC<NewUserProps> = ({addUser}) => {
  const [onChangeName, setOnChangeName ] = useState<string>('');
  const [onChangeRoom, setOnChangeRoom ] = useState<string>('')
  const [ name, setName ] = useState<string>('');
  const [ room, setRoom ] = useState<string>('');

 

  const addNewUser = () => {
      setName(onChangeName);
      setRoom(onChangeRoom)
      addUser(onChangeName, onChangeRoom)
      console.log(name, room)
  }

  
  return(
  <div className="join-outer-container">
    <div className="join-inner-conatainer">
      <h1 className="heading">Join</h1>
      <div><input placeholder="Name" className="join-input" type="text" onChange= {event => setOnChangeName(event.target.value)}/></div>
      <div><input placeholder="Room" className="join-input mt-20" type="text" onChange= {event => setOnChangeRoom(event.target.value)}/></div>
      <div><input value="Join" onClick={addNewUser}/></div>
      {name !== '' && room !== '' ? <CheckJoin /> : null}
      
    </div>
  </div>
  )
}

export default AddUser;