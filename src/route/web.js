// file chịu trách nhiệm luân chuyển các route


import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import { render } from "ejs";

let router = express.Router();


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

    // router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreatNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    // router.get('/halo', (req, res) => {
    //     return res.send('hello express')
    //     //Khi bạn sử dụng res.send, bạn gửi trực tiếp một phản hồi đến client mà không cần thông qua một view template
    // });

    return app.use("/", router)
}

module.exports = initWebRoutes; 