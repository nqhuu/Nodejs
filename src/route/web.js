import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/halo', (req, res) => {
        return res.send('hello express')
    });

    return app.use("/", router)
}

module.exports = initWebRoutes;