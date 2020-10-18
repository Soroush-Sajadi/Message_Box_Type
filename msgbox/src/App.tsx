import React from 'react';
import JoinInput from './Components/JoinInput';
import SocketIo from './Components/SoketIo'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <Router>
        <Route exact path="/" component={JoinInput} />
        <Route exact path="/chat" component={SocketIo} />
      </Router> 
    </div>
  );
}

export default App;
