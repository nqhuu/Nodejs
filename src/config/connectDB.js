// import { Sequelize } from '@sequelize/core';
// import thư viện sequelize và lấy đối tượng Sequelize từ thư viện này
const { Sequelize } = require('sequelize')

// Thiết lập kết nối với database mysql 
// new Sequelize(): Khởi tạo một instance mới của Sequelize để thiết lập kết nối với cơ sở dữ liệu.
const sequelize = new Sequelize('huunq', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    "logging": false
});


// Hàm kết nối cơ sở dữ liệu:
let connectDB = async () => {
    try {
        // Phương thức authenticate() kiểm tra xem các thông tin kết nối (username, password, host, database) có hợp lệ hay không
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB