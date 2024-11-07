// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    // Additional fields can be added as needed
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
