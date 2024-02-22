const availabilitySchema = new mongoose.Schema({
    stylist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stylist',
      required: true
    },
    regular: [{
      dayOfWeek: { type: Number, required: true }, 
      startTime: { type: String, required: true },
      endTime: { type: String, required: true }
    }],
    special: [{
      date: { type: Date, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true }
    }],
    exceptions: [{ 
      date: { type: Date, required: true },
      note: { type: String }
    }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Availability', availabilitySchema);
  