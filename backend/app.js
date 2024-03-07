const express = require('express');
const adminRoutes = require('./Routes/adminRoutes');
const socialRoute=require('./Routes/socialRoutes')
const userRoutes = require('./Routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/social',socialRoute)
module.exports = app;
