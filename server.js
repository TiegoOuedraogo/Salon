const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require('passport');
require('dotenv').config();
require('./config/passport')(passport);
const connectDB = require('./config/db');


const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup should be at the top
app.use(cors());
app.use(express.json()); // Parses JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan('tiny'));

// Connect to database
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes)
app.use('/api/services', serviceRoutes);

// Protected route example
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Protected content');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
