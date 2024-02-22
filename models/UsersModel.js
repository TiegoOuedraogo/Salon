const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['client', 'staff'], 
        default: 'client' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
  }, { timestamps: true });
  
  module.exports =mongoose.model('User', userSchema);