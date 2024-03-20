const express = require('express');
const adminRoutes = require('./Routes/adminRoutes');
const socialRoute = require('./Routes/socialRoutes')
const userRoutes = require('./Routes/userRoutes');
const eventsRoutes = require('./Routes/eventsRoutes');
const adminController = require("./Controllers/adminController");
const socialController=require('./Controllers/socialControllers')
const cors = require('cors')

const app = express();
app.use(express.json());
 app.post('/admin/create', adminController.createAdmin);
// app.post('/social/create',socialController.createPost )
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(adminController.verifyToken);

app.use('/event', eventsRoutes)
app.use('/user', userRoutes)
app.use('/social', socialRoute)
app.use('/admin', adminRoutes);

module.exports = app;
