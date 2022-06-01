//-- Configurações Iniciais --//
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const ApiRoutes = require('./routes/api.js');
const LoginRoutes = require('./routes/login.js');
const DefaultRoute = require('./routes/default.js');

const app = express();

app.engine(
  'handlebars',
  exphbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main',
  }),
);

app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.use(cors());

//-- Conectar com MongoDbAtlas --//
mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectado com MongoDB Atlas!');
  })
  .catch((err) => {
    console.log(err.message);
  });

//-- Express Config --//
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

//-- Rotas --//
app.use('/drink/', ApiRoutes);
app.use('/login/', LoginRoutes);
app.use('/', DefaultRoute);

//-- Entregar uma  Porta --//
app.listen(process.env.PORT || 5000, () => {
  console.log('Aplicação Iniciada!');
});
