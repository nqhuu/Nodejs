'use strict';
const { Model } = require('sequelize'); // Nhập lớp Model từ thư viện sequelize. Lớp này là cơ sở cho tất cả các mô hình Sequelize.
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      // lấy dữ liệu quan hệ ở bảng Allcode với khóa ngoại (foreignKey) trong bảng User quan hệ với khóa chính (targetKey) trong bảng Allcode (foreignKey targetKey có cùng giá trị)
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      User.belongsTo(models.Allcode, { foreignKey: 'roleId', targetKey: 'keyMap', as: 'doctorData' })
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' })
      // User.belongsTo(models.doctor_infor, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorInfor' })
      User.hasOne(models.doctor_infor, { foreignKey: 'doctorId', as: 'doctorInfor' }); //

    }
  };

  // Phương thức init được sử dụng để khởi tạo mô hình User với các thuộc tính và tùy chọn.
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    image: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    positionId: DataTypes.STRING,
  }, {
    // Đối tượng sequelize được truyền vào để liên kết mô hình này với kết nối cơ sở dữ liệu.
    sequelize,
    //modelName: Tên của mô hình là User
    modelName: 'User',
  });
  return User; // Xuất mô hình User 
};