'use strict';
const { Model } = require('sequelize'); // Nhập lớp Model từ thư viện sequelize. Lớp này là cơ sở cho tất cả các mô hình Sequelize.
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    // Phương thức init được sử dụng để khởi tạo mô hình Clinic với các thuộc tính và tùy chọn.
    Clinic.init({
        address: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        // Đối tượng sequelize được truyền vào để liên kết mô hình này với kết nối cơ sở dữ liệu.
        sequelize,
        //modelName: Tên của mô hình là Clinic
        modelName: 'Clinic',
    });
    return Clinic; // Xuất mô hình Clinic 
};