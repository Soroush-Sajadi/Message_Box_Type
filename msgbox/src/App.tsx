import React from 'react';
import Join from './Components/Join';
import Chat from './Components/Chat'
import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>

    </div>
  );
}

export default App;
