const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  module.exports = mongoose.model('appointment', appointmentSchema);

  
