import express from "express";
import bodyParser from "body-parser";
//query, params
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web"
require('dotenv').config();

let app = express();

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8000;
// PORT === undefined => PORT = 8000;

app.listen(port, () => {
    console.log("backend: ", port)
});

