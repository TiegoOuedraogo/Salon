const express = require('express');
const router = express.Router();
const appointment = require('../controllers/appointment'); 
const auth = require('../middlewares/auth');

router.post('/',auth, appointment.createAppointment);

module.exports = router;