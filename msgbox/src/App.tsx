import React from 'react';
import JoinInput from './Components/JoinInput';
import SocketIo from './Components/SoketIo'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      {/* < JoinInput /> */}
       <Router>
        <Route exact path="/" component={JoinInput} />
        <Route exact path="/chat" component={SocketIo} />

        {/* <Route exact path="/chat" render={() => <ChatBox />} /> */}
      </Router> 

    </div>
  );
}

export default App;
