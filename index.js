const express = require("express");

require("dotenv").config();

const route = require("./routes/client/index.router");

const app = express();
const port = process.env.port;

app.set("views", "./views");
app.set("view engine", "pug");

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
