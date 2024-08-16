import express from "express";
import bodyParser from "body-parser";
//query, params
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web"
require('dotenv').config();
import connectDB from "./config/connectDB";
import cors from "cors";

let app = express();
// app.use(cors({ origin: true })); // frontend của bạn
app.use(cors({ credentials: true, origin: true }));


// config app
// config req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app); // chạy ứng dụng với viewEngine đk set bên "./config/viewEngine"
initWebRoutes(app); // chạy đến các viewEngine các route đk cấu hình trong initWebRoutes from "./route/web"

connectDB();

let port = process.env.PORT || 8000;
// PORT === undefined => PORT = 8000;

app.listen(port, () => {
    console.log("backend: ", port)
});

