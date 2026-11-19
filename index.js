// Import Library
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const database = require("./config/database");
database.connect();

const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const systemcongfig = require("./config/system");

const app = express();
const port = process.env.port;
//methodOverride
app.use(methodOverride("_method"));

// Flash
app.use(cookieParser("Quackquack"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//Set pug
app.set("views", "./views");
app.set("view engine", "pug");

//Use public
app.use(express.static("public"));

//App Locals Variable
app.locals.prefixAdmin = systemcongfig.prefixAdmin;

//Routes
routeAdmin(app);
routeClient(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
