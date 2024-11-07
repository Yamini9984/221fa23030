// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Booking = require('../models/booking');
const Event = require('../models/event');

// Configure multer for file upload handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Specify upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Timestamped filename
    }
});
const upload = multer({ storage: storage });

// Admin upload route
router.get('/uploading', (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
        res.render('admin/uploading');
    } else {
        res.redirect('/login');
    }
});

// // Event submission route
// router.post('/submit-event', upload.single('event-image'), async (req, res) => {
//     const { eventTitle, eventDescription, eventDateTime, entryFee, eventLocation, itemsToCarry } = req.body;
//     const eventImage = req.file.path;

//     try {
//         const newEvent = new Event({
//             title: eventTitle,
//             description: eventDescription,
//             dateTime: new Date(eventDateTime),
//             entryFee,
//             location: eventLocation,
//             itemsToCarry,
//             imagePath: eventImage
//         });
//         await newEvent.save();
//         res.redirect('/success');
//     } catch (error) {
//         console.error('Error saving event:', error);
//         res.status(500).send('Failed to save the event.');
//     }
// });

router.post('/submit-event', upload.single('eventImage'), async (req, res) => {
    console.log('Form Data:', req.body); // Log the form data
    console.log('Uploaded File:', req.file); // Log the uploaded file

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const eventData = {
            eventImage: req.file.path,
            eventTitle: req.body.eventTitle,
            eventDescription: req.body.eventDescription,
            eventDateTime: req.body.eventDateTime,
            entryFee: req.body.entryFee,
            eventLocation: req.body.eventLocation,
            itemsToCarry: req.body.itemsToCarry
        };

        const newEvent = new Event(eventData);
        await newEvent.save();
        console.log('Event saved successfully');
        res.redirect('/admin/page');
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).send('Failed to submit event');
    }
});


// Admin page route for event registrations
router.get('/page', async (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
        try {
            const registrations = await Booking.aggregate([
                { $group: { _id: "$event", count: { $sum: 1 } } }
            ]);

            const registrationMap = registrations.reduce((map, reg) => {
                map[reg._id] = reg.count;
                return map;
            }, {});

            const events = await Event.find();
            const eventData = events.map(event => ({
                ...event.toObject(),
                registrationCount: registrationMap[event._id] || 0
            }));

            res.render('admin/page', { events: eventData });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Failed to fetch events.');
        }
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
