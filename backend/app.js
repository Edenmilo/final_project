const express = require('express');
const adminRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/userRoutes');
const adminController = require("./Controllers/adminController");
const userController = require("./Controllers/userController");
const app = express();

app.use(express.json());
app.post('/admin/login', adminController.login);
//app.post('/user/login', userController.login);

app.use(adminController.verifyToken);

app.use('/admin', adminRoutes);

module.exports = app;
