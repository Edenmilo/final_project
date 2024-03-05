const express = require('express');
const adminRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/auth', userRoutes);

module.exports = app;
