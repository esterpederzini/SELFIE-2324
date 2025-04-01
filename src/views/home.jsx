import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/home.css";

const HomePage = () => {
    const [eventi, setEventi] = useState([]);
    const [progetti, setProgetti] = useState([]);

    useEffect(() => {
        // Simulazione del caricamento degli eventi e dei progetti
        setEventi(["Evento 1", "Evento 2", "Evento 3"]);
        setProgetti(["Progetto A - 10 Aprile", "Progetto B - 15 Aprile"]);
    }, []);

    return (
        <div className="container">
            <header>
                <h1>Benvenuto, [Nome Utente]</h1>
            </header>
            <nav>
                <ul>
                    <li><Link to="/calendar">Calendario</Link></li>
                    <li><Link to="/pomodoro">Pomodoro</Link></li>
                    <li><Link to="/note">Note</Link></li>
                    <li><Link to="/timeMachine">Time Machine</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <main>
                <section id="calendario" className="view">
                    <h2>Calendario</h2>
                    <div className="content">
                        <p>Eventi della settimana:</p>
                        <ul>
                            {eventi.map((evento, index) => (
                                <li key={index}>{evento}</li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section id="pomodoro" className="view">
                    <h2>Pomodoro</h2>
                    <div className="content">
                        <p><a href="pomodoro.html">Ultimo pomodoro completato</a>:</p>
                        <p>Durata: 25 minuti</p>
                        <p>Attività: Studio</p>
                    </div>
                </section>
                <section id="note" className="view">
                    <h2>Note</h2>
                    <div className="content">
                        <p><a href="note.html#ultimaNota">Ultima nota creata</a>:</p>
                        <p>"Promemoria per la riunione di domani"</p>
                    </div>
                </section>
                <section id="progetti" className="view">
                    <h2>Progetti</h2>
                    <div className="content">
                        <p>Scadenze imminenti:</p>
                        <ul>
                            {progetti.map((progetto, index) => (
                                <li key={index}>{progetto}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 La Mia App</p>
            </footer>
        </div>
    );
};

export default HomePage;