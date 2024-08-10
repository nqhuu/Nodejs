'use strict';
const { Model } = require('sequelize'); // Nhập lớp Model từ thư viện sequelize. Lớp này là cơ sở cho tất cả các mô hình Sequelize.
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    // Phương thức init được sử dụng để khởi tạo mô hình User với các thuộc tính và tùy chọn.
    Booking.init({
        statusId: DataTypes.STRING,
        docterId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
    }, {
        // Đối tượng sequelize được truyền vào để liên kết mô hình này với kết nối cơ sở dữ liệu.
        sequelize,
        //modelName: Tên của mô hình là User
        modelName: 'Booking',
    });
    return Booking; // Xuất mô hình User 
};