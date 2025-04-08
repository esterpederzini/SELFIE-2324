const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000; 

const MONGODB_URI = 'mongodb://site242525:baexi6Ee@mongo_site242525:27017/admin';

app.use(cors());
app.use(express.json());

// 🔌 Connessione al MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Connessione al MongoDB riuscita!'))
.catch(err => console.error('❌ Errore nella connessione:', err));

// ✅ Rotta di test
app.get('/ping', (req, res) => {
  res.json({ message: 'Backend è attivo e connesso a MongoDB' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});