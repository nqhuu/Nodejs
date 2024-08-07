import express from "express";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send('hello express')
    });
    return app.use("/", router)
}

module.exports = initWebRoutes;