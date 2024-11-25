'use strict';
const { Model } = require('sequelize'); // Nhập lớp Model từ thư viện sequelize. Lớp này là cơ sở cho tất cả các mô hình Sequelize.
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Mỗi Schedule thuộc về một Allcode thông qua timeType sử dụng timType của Schedule để map tới keyMap của Allcode
            Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' });

        }
    };

    // Phương thức init được sử dụng để khởi tạo mô hình Schedule với các thuộc tính và tùy chọn.
    Schedule.init({
        currenNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
    }, {
        // Đối tượng sequelize được truyền vào để liên kết mô hình này với kết nối cơ sở dữ liệu.
        sequelize,
        //modelName: Tên của mô hình là Schedule
        modelName: 'Schedule',
    });
    return Schedule; // Xuất mô hình Schedule 
};