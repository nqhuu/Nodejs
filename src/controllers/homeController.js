import db from "../models/index"
import CRUDService from "../services/CRUDService";


//file chịu trách nhiệm xử lý dữ liệu và thực hiện render dữ liệu theo các điêu hướng route từ phía file web.js bên route

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        })
        // Khi sử dụng render thì tìm các file trong thư mục view đã set bên viewEngine.js : app.set("views", "./src/views")
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render("about/about.ejs")
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    let messenge = await CRUDService.createNewUser(req.body);
    console.log(messenge)
    // console.log(req.body)
    //req.body cho phép ta lấy dư liệu về từ phía người dùng
    // giá trị sẽ là các cạp key: value 
    // với key là giá trị của thuộc tính name, value là giá trị được nhập vào từ thẻ input
    return res.send('post CRUD from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log('------------------------------')
    // console.log(data)
    // console.log('------------------------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data // truyền dữ liệu cho file views để xử lý dữ liệu bên view engine
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id; // sử dụng query để lấy params trên đường link
    console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId) // hàm xử lý lấy dữ liệu của user với id được truyền vào
        //check user data not found

        return res.render('editCRUD.ejs', { //render ra giao diện edit với data được truyền thêm được lấy từ getUserInfoById sau đó xử lý dữ liệu bên views: editCRUD.ejs
            user: userData
        })
    } else {
        return res.send('Users not found!');
    }
    // return res.send('>>>>>>>>', req.query.id);
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data) // chạy hàm updateUserData với tham số truyền vào được lấy từ req.body
    return res.redirect('/get-crud')
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}