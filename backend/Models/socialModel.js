const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../server');
const Admin = require('./adminModel'); // Import the Admin model

const Social = sequelize.define('social', {
  workoutImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workoutName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workoutType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exercises: {
    type: DataTypes.TEXT, 
    allowNull: false,
    get() {
      const exercises = this.getDataValue('exercises');
      return exercises ? JSON.parse(exercises) : null;
    },
    set(value) {
      this.setDataValue('exercises', JSON.stringify(value));
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Define association with Admin model


module.exports = Social;
