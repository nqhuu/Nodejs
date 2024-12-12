// file chịu trách nhiệm luân chuyển các route


import express from "express";
import { render } from "ejs";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController"
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
    router.get('/api/allcode', userController.getAllCode)

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-id', doctorController.getScheduleDoctorById);
    // router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);
    router.post('/api/create-new-specialty', specialtyController.createSpecialty);



    // router.get('/halo', (req, res) => {
    //     return res.send('hello express')
    //     //Khi bạn sử dụng res.send, bạn gửi trực tiếp một phản hồi đến client mà không cần thông qua một view template
    // });

    return app.use("/", router)
}

module.exports = initWebRoutes; 