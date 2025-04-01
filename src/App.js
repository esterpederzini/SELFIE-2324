import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';  
import Calendar from './views/calendar.jsx'
import Home from './views/home'
import Login from './views/login'
import Note from './views/note'
import Pomodoro from './views/Pomodoro'
import TimeMachine from './views/timeMachine'
import './CSS/calendar.css'

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pomodoro" element={<Pomodoro />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/note" element={<Note />} />
          <Route path="/timeMachine" element={<TimeMachine />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
