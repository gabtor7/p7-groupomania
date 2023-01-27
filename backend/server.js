require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

let postRoutes = require('./routes/post');
let authRoutes = require('./routes/auth');

mongoose.connect(process.env.MONGODB_PATH,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Es funktioniert!" });
});
// on ajoutera les routes au fur et à mesure

app.use('/images/', express.static(path.join(__dirname, 'images')));

app.use('/post', postRoutes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
});