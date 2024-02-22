const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    }, 
    price: { 
        type: Number, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
  }, { timestamps: true });
  
  module.exports = mongoose.module('service', serviceSchema)