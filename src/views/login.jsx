import React, { useState } from "react";
import "../CSS/login.css"; // Collegamento al file CSS
import Sfondologin from "../Img/Sfondo login.jpg"
//import { IonIcon } from "react-ionicons"; // Per le icone Ionicons

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://site242525.tw.cs.unibo.it:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Login riuscito", data);
      } else {
        console.error("Errore nel login", data.error);
        alert("Credenziali errate");
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      alert("Errore nel server");
    }
  };

  return (
    <section>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="input-box">
            <span className="icon">
              <ion-icon name="person"></ion-icon>
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="/signup">Register</a>
            </p>
          </div>
        </form>
      </div>

      {/* Inclusione degli script Ionicons per le icone */}
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </section>
  );
};

export default Login;
