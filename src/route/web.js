import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/about', homeController.getAboutPage)

    router.get('/halo', (req, res) => {
        return res.send('hello express')
        //Khi bạn sử dụng res.send, bạn gửi trực tiếp một phản hồi đến client mà không cần thông qua một view template
    });

    return app.use("/", router)
}

module.exports = initWebRoutes;