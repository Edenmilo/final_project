const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../server')

// Define the User model
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

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('User model synchronized with the database');
  } catch (error) {
    console.error('Error synchronizing User model:', error);
  }
})();

module.exports = User;
