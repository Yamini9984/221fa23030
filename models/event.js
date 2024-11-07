// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     dateTime: {
//         type: Date,
//         required: true
//     },
//     entryFee: {
//         type: Number,
//         required: true
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     itemsToCarry: {
//         type: String,
//         required: true
//     },
//     imagePath: {
//         type: String,
//         required: true
//     }
// });

// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event;


const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventImage: {
        type: String,
        required: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventDateTime: {
        type: Date,
        required: true
    },
    entryFee: {
        type: Number,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    itemsToCarry: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
