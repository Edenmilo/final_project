const {Sequelize}= require("sequelize")
const port = 3306

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Database.sqlite',
  });
  module.exports=sequelize;
  sequelize.sync()
  const app = require('./app')

  app.listen(port,()=>{
    console.log('server is up and running');
  } )