const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const cors = require('cors');
const User = require("./src/backend/User");

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });*/
const PORT = 8000;
//const PORT = 5000;

console.log("Tentativo di connessione a MongoDB...");

app.use(cors());
app.use(express.json());

//mongoose.connect("mongodb+srv://esterpederzini:ngwMyEe2H1TkKMuB@clusterselfie.k0te13b.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSelfie")
mongoose.connect("mongodb://site242525:baexi6Ee@mongo_site242525:27017/mydb?authSource=admin")
  .then(async() => {
    console.log("Connesso a MongoDB");

    app.get("/", (req, res) => {
      res.send("Server e MongoDB attivi!");
      console.log('funzionaaa')
    });

    app.post("/login", async (req, res) => {
      const { username, password } = req.body;

      try {
        const user = await User.findOne({ username });

        if (!user) {
          return res.status(401).json({ error: "Utente non trovato" });
        }

        if (user.password !== password) {
          return res.status(401).json({ error: "Password errata" });
        }

        res.status(200).json({ message: "Login riuscito", user });
      } catch (error) {
        console.error("Errore nel login:", error);
        res.status(500).json({ error: "Errore del server" });
      }
    });

    // Aggiungi un utente di test se non esiste già
    const userExists = await User.findOne({ username: "testuser" });
    if (!userExists) {
      const newUser = new User({
        name: "Test",
        surname: "User",
        username: "testuser",
        email: "testuser@example.com",
        password: "password123", // Questo dovresti criptarlo in un'applicazione reale
        idNumber: 1
      });

      await newUser.save();
      console.log("Utente di test inserito:", newUser);
    }

    app.listen(PORT, () => {
      console.log(`Server avviato su porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Errore nella connessione a MongoDB:", err);
  });