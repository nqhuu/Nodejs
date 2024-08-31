// lấy dữ liệu từ phía db với các tham số được truyên vào từ các modul khác

import { where } from "sequelize";
import db from "../models/index"
import bcrypt from 'bcryptjs' // thư viện hash password

const salt = bcrypt.genSaltSync(10);

//hàm xử lý hash password
let hashUserPassword = (password) => {
    return new Promise(async (resole, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resole(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

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

// let getAllUsers = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = '';
//             if (userId) {
//                 if (userId === 'ALL') {
//                     users = await db.User.findAll({
//                         attributes: {
//                             exclude: ['password']
//                         }
//                     })
//                 }
//                 if (userId !== 'ALL') {
//                     users = await db.User.findOne({
//                         where: { id: userId },
//                         attributes: {
//                             exclude: ['password']
//                         }
//                     })
//                 }
//             }
//             resolve(users)

//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let getAllUsers = async (userId) => {
    try {
        let users = ''
        if (userId) {
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
                return users
            }
            if (userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
                return users
            }
        }
    } catch (e) {
        return (e)
    }
}

// let createNewUser = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             //check sự tồn tại của email
//             let check = await checkUserEmail(data.email);
//             if (check) {
//                 resolve({
//                     errCode: 1,
//                     message: 'email đã đươc sử dụng'
//                 })
//             } else {
//                 let hashPasswordFromVcrypt = await hashUserPassword(data.password)
//                 await db.User.create({
//                     email: data.email,
//                     password: hashPasswordFromVcrypt,
//                     firstName: data.firstName,
//                     lastName: data.lastName,
//                     address: data.address,
//                     gender: data.gender === '1' ? true : false,
//                     roleId: data.roleId,
//                     phonenumber: data.phonenumber,
//                 })

//                 resolve({
//                     errCode: 0,
//                     errMessage: 'OK'
//                 }); // tương đương với return

//             }

//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let createNewUser = async (data) => {
    try {
        let checkEmail = await checkUserEmail(data.email)
        if (checkEmail) {
            return ({
                errCode: 1,
                errMessage: 'Email đã tồn tại, vui lòng nhập email mới'
            })
        } else {
            let hashPasswordFromVcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromVcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            return ({
                errCode: 0,
                errMessage: 'Tạo tài khoản thành công'
            })
        }
    } catch (e) {
        return (e)
    }
}

// let deleteUser = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         let user = await db.User.findOne({
//             where: { id: userId }
//         })
//         if (!user) {
//             resolve({
//                 errCode: 2,
//                 errMessage: 'Người dùng không tồn tại'
//             })
//         } else {
//             await db.User.destroy({
//                 where: { id: userId }
//             }); // thực hiện xáo user với hamg destroy
//             resolve({
//                 errCode: 0,
//                 errMessage: 'xóa thành công'
//             })
//         }
//     })
// }

let deleteUser = async (userId) => {
    try {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (user) {
            await db.User.destroy({
                where: { id: userId }
            })
            return ({
                errCode: 0,
                errMessage: `xóa thành công user: ${user.email}`
            })
        } else {
            return ({
                errCode: 2,
                errMessage: `Không tìm thấy user`
            })
        }
    } catch (e) {
        return (e)
    }
}

// let updateUserData = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: data.id },
//                 raw: false
//             })

//             // gán lại giá trị cho từng thuộc tính của user với data được tuyền vào từ 
//             // userController.handleEditUser
//             if (user) {

//                 user.firstName = data.firstName;
//                 user.lastName = data.lastName;
//                 user.address = data.address;

//                 // thực hiện cập nhật dữ liệu vào db
//                 await user.save();

//                 //trả về thông báo thành công
//                 resolve({
//                     errCode: 0,
//                     errMessage: `Cập nhật thành công cho tài khoản có email là : ${user.email}`
//                 })
//             } else {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'user không tồn tại'
//                 })
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let updateUserData = async (data) => {
    try {
        let userId = await data.id
        let user = await db.User.findOne({
            where: { id: userId },
            raw: false
        })
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phonenumber = data.phonenumber;
            user.roleId = data.roleId;
            user.sex = data.sex;

            await user.save()
            return ({
                errCode: 0,
                errMessage: 'Chỉnh sửa user thành công'
            })
        } else {
            return ({
                errCode: 1,
                errMessage: 'Không thể chỉnh sửa user'
            })
        }
    } catch (e) {
        return e
    }
}


module.exports = {
    handeleUserLogin: handeleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}