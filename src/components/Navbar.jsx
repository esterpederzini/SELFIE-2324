import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <nav>
        <ul>
         <li><Link to="/calendar">Calendario</Link></li>
         <li><Link to="/pomodoro">Pomodoro</Link></li>
         <li><Link to="/note">Note</Link></li>
         <li><Link to="/timeMachine">Time Machine</Link></li>
         <li><Link to="/login">Login</Link></li>
        </ul>
     </nav>
    </div>
  )
}

export default Navbar