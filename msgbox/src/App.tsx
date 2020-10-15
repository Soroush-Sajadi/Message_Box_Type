import React from 'react';
import JoinInput from './Components/JoinInput';
import Chat from './Components/Chat'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      {/* < JoinInput /> */}
       <Router>
        <Route exact path="/" component={JoinInput} />
        <Route exact path="/chat" component={Chat} />

        {/* <Route exact path="/chat" render={() => <ChatBox />} /> */}
      </Router> 

    </div>
  );
}

export default App;
