const mongoose = require('mongoose');

const stylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    profilePicture: String,
    qualifications: [String],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    availability: [{ 
        date: Date,
        startTime: String,
        endTime: String,
    }],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Stylist', stylistSchema, 'customCollectionName');

