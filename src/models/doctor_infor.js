'use strict';
const { Model } = require('sequelize'); // Nhập lớp Model từ thư viện sequelize. Lớp này là cơ sở cho tất cả các mô hình Sequelize.
module.exports = (sequelize, DataTypes) => {
    class doctor_infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            doctor_infor.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctorInfor' })

            doctor_infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' })
            doctor_infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' })
            doctor_infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' })

        }
    };

    // Phương thức init được sử dụng để khởi tạo mô hình doctor_infor với các thuộc tính và tùy chọn.
    doctor_infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,

    }, {
        // Đối tượng sequelize được truyền vào để liên kết mô hình này với kết nối cơ sở dữ liệu.
        sequelize,
        //modelName: Tên của mô hình là doctor_infor
        modelName: 'doctor_infor',
        freezeTableName: true, //sẽ trả ra modelName có tên chính xác như modelName bên trên
    });
    return doctor_infor; // Xuất mô hình doctor_infor 
};