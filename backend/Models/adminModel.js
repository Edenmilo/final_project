const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../server');

const Event = sequelize.define('event', {
    title: DataTypes.STRING,
    startTime: DataTypes.DATE,
    finishTime: DataTypes.DATE,
    studentsLimit: DataTypes.INTEGER,
    registeredUsers: {
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: []
    },
    summary: DataTypes.TEXT
  });
  

const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

// Define association
Admin.hasMany(Event);

module.exports = { Admin, Event };
