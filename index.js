require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const ApiRoutes = require('./src/routes/api.js');
const AuthRoutes = require('./src/routes/auth.js');
const DefaultRoute = require('./src/routes/default.js');

const { IncrementRequests } = require('./src/middlewares/IncrementRequests');

const app = express();

app.engine(
  'handlebars',
  exphbs.engine({
    layoutsDir: __dirname + '/src/views/layouts',
    defaultLayout: 'main',
  }),
);

app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(__dirname + '/src/public'));
app.set('view engine', 'handlebars');
app.use(cors());

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

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use('/drink/', IncrementRequests, ApiRoutes);
app.use('/login/', IncrementRequests, AuthRoutes);
app.use('/', DefaultRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('Aplicação Iniciada!');
});
