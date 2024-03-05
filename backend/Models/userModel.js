const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../server');
const {Admin} = require('../Models/adminModel'); // Import the Admin model

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING },
  height: { type: DataTypes.FLOAT },
  weight: { type: DataTypes.FLOAT },
  age: { type: DataTypes.INTEGER },
  goalWeight: { type: DataTypes.FLOAT },
  bodyFat: { type: DataTypes.FLOAT, allowNull: true },
  menu: { 
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const menuData = this.getDataValue('menu');
      return menuData ? JSON.parse(menuData) : null;
    },
    set(value) {
      this.setDataValue('menu', JSON.stringify(value));
    }
  }
});

// Define the association between User and Admin
User.belongsTo(Admin, { as: 'createdBy', foreignKey: 'createdById' });



module.exports = User;
