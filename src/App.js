import React, { useState, useEffect } from 'react';
//import './CSS/Navbar.css'
import Calendar from './views/calendar'
import './index.css'; 
import './CSS/calendar.css'
import Home from './views/home'
import Login from './views/login'
import Note from './views/note'
import TimeMachine from './views/timeMachine'

const App = () => {
 
  const [route, setRoute] = useState(window.location.pathname);

  // Funzione per gestire il routing
  const handleNavigation = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  // Ascolta i cambiamenti nell'URL per supportare il pulsante indietro/avanti
  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // Funzione per scegliere cosa visualizzare
  const renderRoute = () => {
    switch (route) {
      case '/':
        return <Home />;

      case '/calendario':
        return <Calendar />;

      case '/login':
        return <Login />;      
        
      case '/note':
        return <Note />;

      case '/timeMachine':
        return <TimeMachine />;
        
      default:
        return <h1>404 - Page Not Found</h1>;
    }
  };

  return (
    <div className='container'>
     <nav>
        {/* Links che modificano l'URL senza ricaricare */}
        
        <button className='nav-button' onClick={() => handleNavigation('/')}>Home</button>
        <button className='nav-button' onClick={() => handleNavigation('/calendario')}>Calendario</button>
        <button className='nav-button' onClick={() => handleNavigation('/note')}>Note</button>
        <button className='nav-button' onClick={() => handleNavigation('/timeMachine')}>Time machine</button>
        <button className='nav-button' onClick={() => handleNavigation('/login')}>Login</button>
      </nav>

      {/* Renderizza il contenuto in base alla route */ }
      {renderRoute()}
      <Calendar />
    </div>
  );
}

export default App;
