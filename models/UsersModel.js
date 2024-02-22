const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10; 

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'] 
  },
  phone: { 
    type: String, 
    required: true,
    validate: [validator.isMobilePhone, 'Please provide a valid phone number'] 
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

userSchema.pre('save', function(next) {
    let user = this;
  
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
  
      // Hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
  
        // Override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

module.exports = mongoose.model('User', userSchema);
