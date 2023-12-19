// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';// Import your Signup component
import Home from './components/Home';
import './App.css'
import Root from './components/Root';
import Plant from './components/Plant';
import Hierarchy from './components/Hierarchy';
const App: React.FC = () => {
  const [username, setUsername] = useState();
  return (
    <Router>
      <Switch>
        <Route path="/signup" element={<Signup setUsername={setUsername} />} />
        <Route path="/" element={<Login setUsername={setUsername} />} />
        <Route path='/home' element={<Home username={username} />} />
        <Route path='/addroot' element={<Root username={username} />} />
        <Route path='/plant' element={<Plant username={username} />} />
        <Route path='/hierarchy/:plantName?' element={<Hierarchy username={username} />} />

      </Switch>
    </Router>
  );
};

export default App;
