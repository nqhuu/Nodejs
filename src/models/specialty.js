'use strict';
const { Model } = require('sequelize'); // Nhập lớp Model từ thư viện sequelize. Lớp này là cơ sở cho tất cả các mô hình Sequelize.
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Specialty.hasMany(models.doctor_infor, { foreignKey: 'specialtyId', targetKey: 'id', as: 'specialtyData' });
        }
    };

    // Phương thức init được sử dụng để khởi tạo mô hình Specialty với các thuộc tính và tùy chọn.
    Specialty.init({
        name: DataTypes.STRING,
        descriptionMarkdown: DataTypes.TEXT,
        descriptionHTML: DataTypes.TEXT,
        image: DataTypes.TEXT,
    }, {
        // Đối tượng sequelize được truyền vào để liên kết mô hình này với kết nối cơ sở dữ liệu.
        sequelize,
        //modelName: Tên của mô hình là Specialty
        modelName: 'Specialty',
    });
    return Specialty; // Xuất mô hình Specialty 
};