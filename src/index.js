//-- Configurações Iniciais --//
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
  })
);

app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.use(cors());

dotenv.config();

//-- Tela Padrão --//
app.get('/', (req, res) => {
  res.render('pages/defaultpage', {number: 10});
});

//-- Conectar com MongoDbAtlas --//
mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado com MongoDB Atlas!");
  })
  .catch((err) => {
    console.log(err.message);
  });

//-- Express Config --//
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//-- Entregar uma  Porta --//
app.listen(process.env.PORT || 5000, () => {
  console.log("Aplicação Iniciada!");
});
