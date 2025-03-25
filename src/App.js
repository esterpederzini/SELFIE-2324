import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Importa i componenti necessari
import Calendar from './views/calendar.jsx'
import Home from './views/home'
import Login from './views/login'
import Note from './views/note'
import Pomodoro from './views/Pomodoro'
import TimeMachine from './views/timeMachine'
import './CSS/calendar.css'

const App = () => {
  return (
    <Router> {/* Usa Router per abilitare la navigazione */}
      <div className="container">
        <nav>
          {/* Usa Link per la navigazione tra le rotte */}
          <Link className="nav-button" to="/">Home</Link>
          <Link className="nav-button" to="/Pomodoro">Pomodoro</Link>
          <Link className="nav-button" to="/calendar">Calendario</Link>
          <Link className="nav-button" to="/Note">Note</Link>
          <Link className="nav-button" to="/Timemachine">Time machine</Link>
          <Link className="nav-button" to="/Login">Login</Link>
        </nav>

        {/* Le rotte vengono gestite da Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pomodoro" element={<Pomodoro />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/note" element={<Note />} />
          <Route path="/timeMachine" element={<TimeMachine />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} /> {/* Gestisce il caso di pagina non trovata */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
