const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../server');


const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING },
  height: { type: DataTypes.FLOAT },
  weight: {
    type: DataTypes.ARRAY(DataTypes.FLOAT),
    allowNull: true,
  },  age: { type: DataTypes.INTEGER },
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
  },
  AdminId: { type: DataTypes.INTEGER, allowNull: false }
});



module.exports = User;
