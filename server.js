/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000; 

const MONGODB_URI = "mongodb+srv://esterpederzini:ngwMyEe2H1TkKMuB@clusterselfie.k0te13b.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSelfie";

app.use(cors());
app.use(express.json());

// 🔌 Connessione al MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('Connessione al MongoDB riuscita!'))
.catch(err => console.error('Errore nella connessione:', err));

// ✅ Rotta di test
app.get('/ping', (req, res) => {
  res.json({ message: 'Backend è attivo e connesso a MongoDB' });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});*/

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 80; // richiesto da Gocker

console.log("🔁 Tentativo di connessione a MongoDB...");

// Connessione a MongoDB

mongoose.connect("mongodb://site242525:baexi6Ee@mongo_site242525:27017/mydb?authSource=admin")
  .then(() => {
    console.log("✅ Connesso a MongoDB");

    app.get("/", (req, res) => {
      res.send("Server e MongoDB attivi!");
    });

    app.listen(PORT, () => {
      console.log(`Server avviato su porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Errore nella connessione a MongoDB:", err);
  });