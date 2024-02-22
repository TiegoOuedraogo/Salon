const express = require('express');
const mongoose = require('mongoose');
const config = require('./config'); 
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

require('dotenv').config();
require('./config/passport')(passport); 

const PORT = config.port || 5000;

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Initializes passport
app.use(passport.initialize()); 
app.use(morgan('tiny'));

connectDB();

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
