//hash password
import bcrypt from 'bcryptjs'
import db from '../models/index';
import { where } from 'sequelize';
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);

// xử lý các hàm CRUD 

let createNewUser = async (data) => {

    // sử dụng promise để xử lý tác vụ cần thời gian, ở đây là tác vụ hash password
    return new Promise(async (resolve, reject) => {
        try {
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

            resolve('create a new user Succeed'); // tương đương với return

        } catch (e) {
            reject(e);
        }
    })
}

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


let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({ // sử dụng findAll để lấy tất cả dữ liệu trong db theo bảng User 
                raw: true, // để hiển thị dữ liệu theo kiểu object dễ nhìn
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}


// lấy dữ liệu của user với id được truyền vào từ bên homeController
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })

            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

//update data với cấu trúc của sequelize
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve();

            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

//Delete data với cấu trúc của sequelize
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}