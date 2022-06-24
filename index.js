require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const ApiRoutes = require('./src/routes/api');
const AuthRoutes = require('./src/routes/auth');
const DefaultRoute = require('./src/routes/default');

const { IncrementRequests } = require('./src/middlewares/IncrementRequests');
const config = require('./src/config/index');

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
app.use(cors(config.options));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectado com MongoDB Atlas!');
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use('/drink/', IncrementRequests, ApiRoutes);
app.use('/auth/', IncrementRequests, AuthRoutes);
app.use('/', DefaultRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('Aplicação Iniciada!');
});
