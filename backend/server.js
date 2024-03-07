const { Sequelize } = require("sequelize")
const port = 3306

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Database.sqlite',
});
module.exports = sequelize;
sequelize.sync()

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
//   (async () => {
//     try {
//       await sequelize.sync({ force: true });
//       console.log('User models synchronized with the database');
//     } catch (error) {
//       console.error('Error synchronizing User model:', error);
//     }
//   })();
const app = require('./app')

app.listen(port, () => {
    console.log('server is up and running');
})