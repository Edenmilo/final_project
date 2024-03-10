const express = require('express');
const adminRoutes = require('./Routes/adminRoutes');
const socialRoute = require('./Routes/socialRoutes')
const userRoutes = require('./Routes/userRoutes');
const eventsRoutes = require('./Routes/eventsRouts');
const adminController = require("./Controllers/adminController");
const userController = require("./Controllers/userControllers");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.post('/admin/login', adminController.login);
app.post('admin/create', adminController.createAdmin);

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/admin', adminRoutes);
app.use('/event', eventsRoutes)
app.use('/user', userRoutes)
app.use(adminController.verifyToken);
app.use('/social', socialRoute)
module.exports = app;
