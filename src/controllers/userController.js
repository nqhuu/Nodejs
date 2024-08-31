//hàm chịu trách nhiệm trả về dữ liệu cho FE

import userService from "../services/userService"
import bcrypt from 'bcryptjs' // thư viện hash password


let handleLogin = async (req, res) => {
    // lấy dữ liệu nhập vào của FE
    let email = req.body.email;
    let password = req.body.password;

    // nếu 1 trong 2 trường này không tồn tại thì tra về obj với các trường ... và kết thúc
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing'
        })
    }

    // nếu if trên === false thì chạy tiếp : lấy dữ liệu khi FE nhập đủ các trường yêu cầu, hàm xử lý này bên userService.handeleUserLogin
    let userData = await userService.handeleUserLogin(email, password);


    // check tồn tại email
    // compare password
    // return user Infor
    // access_token: JWT Json web token


    // trả về obj userData về cho FE với các điều kiện được code ở bên userService
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}



// let handleGetAllUsers = async (req, res) => {
//     let id = req.query.id
//     if (!id) {
//         return res.status(200).json({
//             errCode: 1,
//             errMessage: 'missing',
//             users: []
//         })
//     }
//     let users = await userService.getAllUsers(id)

//     if (users === null) {
//         return res.status(200).json({
//             errCode: 2,
//             errMessage: 'user không tồn tại',
//             users: []
//         })
//     }

//     return res.status(200).json({
//         errCode: 0,
//         errMessage: 'OK',
//         users
//     })
// }

let handleGetAllUsers = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'không lấy được thông tin user để hiển thị'
        })
    }

    let users = await userService.getAllUsers(userId)

    if (userId === 'ALL') {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Lấy dữ liệu ALL',
            users
        })
    }

    if (userId && userId !== "ALL") {
        if (users == null) {
            return res.status(200).json({
                errCode: 2,
                errMessage: 'không tồn tại user này'
            })
        } else {
            return res.status(200).json({
                errCode: 3,
                errMessage: 'lấy dữ liệu user',
                users
            })
        }
    }
}

// thêm users
// let handleCreatNewUser = async (req, res) => {
//     let message = await userService.createNewUser(req.body);
//     console.log(message)
//     return res.status(200).json(message);
// }

let handleCreatNewUser = async (req, res) => {
    let data = req.body
    if (!data.email) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Bạn cần nhập email'
        })
    }
    let message = await userService.createNewUser(data)
    return res.status(200).json(message)
}

// let handleEditUser = async (req, res) => {
//     if (!req.body.id) {
//         return res.status(200).json({
//             errCode: 1,
//             errMessage: 'Không xác định được user (id) cần sửa'
//         })
//     }
//     let message = await userService.updateUserData(req.body);
//     return res.status(200).json(message)
// }

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUserData(data)
    if (!data.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'user không tồn tại'
        })

    }
    return res.status(200).json(message)
}


// let handleDeleteUser = async (req, res) => {
//     if (!req.body.id) {
//         return res.status(200).json({
//             errCode: 1,
//             errMessage: 'chưa xác định được user (id) cần xóa'
//         })
//     }
//     let message = await userService.deleteUser(req.body.id);
//     return res.status(200).json(message);
// }

let handleDeleteUser = async (req, res) => {
    let userId = req.body.id;
    console.log('userService 158', userId)
    if (userId) {
        let message = await userService.deleteUser(userId);
        return res.status(200).json(message)
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Không thực hiện xóa được user'
        })

    }
}


let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreatNewUser: handleCreatNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}