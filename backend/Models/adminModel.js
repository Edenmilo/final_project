const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../server');
const User = require('./userModel');

const Admin = sequelize.define('Admin', {
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

const Event = sequelize.define('Event', {
  title: DataTypes.STRING,
  startTime: DataTypes.DATE,
  finishTime: DataTypes.DATE,
  studentsLimit: DataTypes.INTEGER,
  summary: DataTypes.TEXT
});
const EventUser = sequelize.define('EventUser', {
  UserId: DataTypes.INTEGER,
  EventId: DataTypes.INTEGER
})


Admin.hasMany(Event);
Event.belongsToMany(User, { through: 'EventUser' });
User.belongsToMany(Event, { through: 'EventUser' });
User.belongsTo(Admin);

module.exports = { Admin, Event, EventUser };;
