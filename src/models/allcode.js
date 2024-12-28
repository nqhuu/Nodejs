'use strict';
const { Model } = require('sequelize'); // Nhập lớp Model từ thư viện sequelize. Lớp này là cơ sở cho tất cả các mô hình Sequelize.
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { // Mối Quan Hệ
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'doctorData' })

            // Một Allcode có thể liên kết với nhiều Schedule thông qua keyMap
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', sourceKey: 'keyMap', as: 'scheduleData' });

            Allcode.hasMany(models.doctor_infor, { foreignKey: 'priceId', as: 'priceData' });
            Allcode.hasMany(models.doctor_infor, { foreignKey: 'provinceId', as: 'provinceData' });
            Allcode.hasMany(models.doctor_infor, { foreignKey: 'paymentId', as: 'paymentData' });

        }
    };

    // Phương thức init được sử dụng để khởi tạo mô hình User với các thuộc tính và tùy chọn.
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        // Đối tượng sequelize được truyền vào để liên kết mô hình này với kết nối cơ sở dữ liệu.
        sequelize,
        //modelName: Tên của mô hình là User
        modelName: 'Allcode',
    });
    return Allcode; // Xuất mô hình User 
};