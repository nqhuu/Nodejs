import { where } from "sequelize";
import db from "../models/index"
import bcrypt from 'bcryptjs' // thư viện hash password


//hàm xử lý check login
let handeleUserLogin = (userEmail, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {

            };

            // biến chứa giá trị resolve trả về (true,false) từ hàm checkUserEmail bên dưới
            let isExist = await checkUserEmail(userEmail);


            if (isExist) {
                //user already exist
                // lấy dữ liệu từ db bằng hàm findOne của thư viện sequelize
                // findOne sẽ trả về bản ghi đầu tiên khớp với điều kiện where, hoặc null nếu không tìm thấy bản ghi nào.
                let user = await db.User.findOne({
                    where: { email: userEmail },
                    attributes: ['email', 'roleId', 'password'], //chỉ lấy các trường này, phải lấy thêm password để check dưới hàm if
                    raw: true, //Trả về kết quả dưới dạng đối tượng JavaScript thuần túy (không phải là một đối tượng phức tạp của Sequelize).
                });

                // nếu tồn tại user thì tiếp tục xử lý password
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password); // check password được hash với thư viện bcrypt, hàm compareSync sẽ trả về true hoặc false
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';

                        delete user.password; // xóa password trong user để không trả về cho FE password tránh việc lộ mk
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong Password';
                    };

                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                };

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Email không tồn tại trên hệ thống`
            };

            resolve(userData) // trả về dữ liệu, dữ liệu này được sử dụng bên UserController.handleLogin 

        } catch (e) {
            reject(e)
        }
    })

}


//hàm check sự tồn tại của email tren db, trả về true false
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    handeleUserLogin: handeleUserLogin,
}