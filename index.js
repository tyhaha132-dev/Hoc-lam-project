const express = require("express");
const database = require("./config/database");
const route = require("./routes/client/index.router");
require("dotenv").config();

database.connect();

const app = express();
const port = process.env.port;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
