const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    passengers: { type: Number, required: true, default:1 },
    // seatNumbers: [String],  // Array of seat numbers booked
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
});

module.exports = mongoose.model('Booking', bookingSchema);