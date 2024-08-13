import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

// file chịu trách nhiệm luân chuyển các route

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);


    // router.get('/halo', (req, res) => {
    //     return res.send('hello express')
    //     //Khi bạn sử dụng res.send, bạn gửi trực tiếp một phản hồi đến client mà không cần thông qua một view template
    // });

    return app.use("/", router)
}

module.exports = initWebRoutes;