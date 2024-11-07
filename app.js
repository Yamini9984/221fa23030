
// // app.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const session = require('express-session');
// const connectDB = require('./config/db');
// const User = require('./models/user');
// const Booking = require('./models/booking'); // Import the Booking model
// const Event = require('./models/event'); // Import the Event model
// require('dotenv').config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// // Session setup
// app.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
// }));

// // Middleware to check if user is authenticated
// // function isAuthenticated(req, res, next) {
// //     if (req.session.user) {
// //         return next(); // User is authenticated, proceed to the next middleware/route
// //     } else {
// //         req.session.returnTo = req.originalUrl; // Save the original URL
// //         return res.redirect('/login'); // User is not authenticated, redirect to login
// //     }
// // }

// // Home route
// app.get('/', (req, res) => {
//     res.render('index');
// });

// // About route
// app.get('/about', (req, res) => {
//     res.render('about');
// });

// // Event details route
// app.get('/event-details', (req, res) => {
//     res.render('event-details');
// });

// // Book ticket route
// app.get('/book-ticket', (req, res) => {
//     res.render('book-ticket');
// });

// // Success route
// app.get('/success', (req, res) => {
//     res.render('success');
// });

// // Login route
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Register route
// app.get('/register', (req, res) => {
//     res.render('register');
// });

// // Dashboard route
// app.get('/user/dashboard', (req, res) => {
//     res.render('user/dashboard', { username: req.session.user.username });
// });
// // Route for the home page
// app.get('/home', (req, res) => {
//     res.render('user/home'); // Render your home Pug file
// });
// // Register POST route
// app.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).render('register', { error: 'User already exists' });
//         }

//         const newUser = new User({ username, email, password });
//         await newUser.save();
//         res.redirect('/success');
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).render('register', { error: 'Failed to register' });
//     }
// });

// // Login POST route
// // app.post('/login', async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         const user = await User.findOne({ email });
// //         if (!user || !(await user.isValidPassword(password))) {
// //             return res.status(400).render('login', { error: 'Invalid email or password' });
// //         }

// //         req.session.user = { id: user._id, username: user.username };

// //         // Redirect to the dashboard after successful login
// //         res.redirect('/user/dashboard');
// //     } catch (error) {
// //         console.error('Login error:', error);
// //         res.status(500).render('login', { error: 'Failed to log in' });
// //     }
// // });


// // Login POST route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the login is for the admin
//         if (email === 'admin@gmail.com' && password === 'admin') {
//             req.session.user = { email, role: 'admin' }; // Set a session variable for admin
//             return res.redirect('/admin/uploading'); // Redirect to the admin upload page
//         }

//         // If not admin, proceed with user login
//         const user = await User.findOne({ email });
//         if (!user || !(await user.isValidPassword(password))) {
//             return res.status(400).render('login', { error: 'Invalid email or password' });
//         }

//         req.session.user = { id: user._id, username: user.username };

//         // Redirect to the user dashboard after successful login
//         res.redirect('/user/dashboard');
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).render('login', { error: 'Failed to log in' });
//     }
// });

// // Admin upload route
// app.get('/admin/uploading', (req, res) => {
//     // You may want to check if the user is an admin before rendering this page
//     if (req.session.user && req.session.user.role === 'admin') {
//         res.render('admin/uploading'); // Render the admin upload page
//     } else {
//         res.redirect('/login'); // Redirect to login if not an admin
//     }
// });


// // Confirmation route
// app.post('/confirmation', (req, res) => {
//     const { name, email, tickets } = req.body;
//     res.render('confirmation', { name, email, tickets });
// });



// // Booking form submission route
// app.post('/submit-booking', async (req, res) => {
//     const { name, email, phone } = req.body;

//     try {
//         // Create a new booking instance
//         const newBooking = new Booking({ name, email, phone });
        
//         // Save the booking to MongoDB
//         await newBooking.save();

//         // Redirect or render a success page
//         res.redirect('/success'); // Change to the success page route if needed
//     } catch (error) {
//         console.error('Booking error:', error);
//         res.status(500).render('book-ticket', { error: 'Failed to book the event' });
//     }
// });


// // Logout route
// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error('Error destroying session:', err);
//             return res.status(500).send('Could not log out. Please try again.');
//         }
//         res.redirect('/'); // Redirect to the index page after logout
//     });
// });

// // Configure multer for file upload handling
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Specify the directory to store uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the filename
//     }
// });

// const upload = multer({ storage: storage });

// // Event submission route
// app.post('/submit-event', upload.single('event-image'), async (req, res) => {
//     const { eventTitle, eventDescription, eventDateTime, entryFee, eventLocation, itemsToCarry } = req.body;
//     const eventImage = req.file.path; // Access the uploaded file's path

//     // Create a new event instance
//     const newEvent = new Event({
//         title: eventTitle,
//         description: eventDescription,
//         dateTime: new Date(eventDateTime), // Ensure date is a Date object
//         entryFee: entryFee,
//         location: eventLocation,
//         itemsToCarry: itemsToCarry,
//         imagePath: eventImage
//     });

//     try {
//         // Save the event to the database
//         await newEvent.save();
//         console.log('Event saved successfully:', newEvent);
//         res.redirect('/success'); // Redirect to a success page
//     } catch (error) {
//         console.error('Error saving event:', error);
//         res.status(500).send('Failed to save the event. Please try again.');
//     }
// });
// // Admin page route for event registrations
// app.get('/admin/page', async (req, res) => {
//     if (req.session.user && req.session.user.role === 'admin') {
//         try {
//             // Aggregate bookings by event to count registrations
//             const registrations = await Booking.aggregate([
//                 {
//                     $group: {
//                         _id: "$event", // Group by event ID
//                         count: { $sum: 1 } // Count the number of bookings
//                     }
//                 }
//             ]);

//             // Convert registration count to a map for easy lookup
//             const registrationMap = registrations.reduce((map, reg) => {
//                 map[reg._id] = reg.count;
//                 return map;
//             }, {});

//             // Fetch all events
//             const events = await Event.find();

//             // Combine event data with registration counts
//             const eventData = events.map(event => ({
//                 ...event.toObject(),
//                 registrationCount: registrationMap[event._id] || 0 // Set to 0 if no registrations
//             }));

//             res.render('admin/page', { events: eventData }); // Pass event data to the Pug template
//         } catch (error) {
//             console.error('Error fetching events and registrations:', error);
//             res.status(500).send('Failed to fetch events and registrations.');
//         }
//     } else {
//         res.redirect('/login'); // Redirect to login if not an admin
//     }
// });

// // 404 Error handling
// app.use((req, res) => {
//     res.status(404).render('404');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



//----------------------------------------------------------------------------------------------


// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/user');
const bcrypt = require('bcrypt');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Import route files
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// About route
app.get('/about', (req, res) => {
    res.render('about');
});

// Event details route
app.get('/event-details', (req, res) => {
    res.render('event-details');
});

// Book ticket route
app.get('/book-ticket', (req, res) => {
    res.render('book-ticket');
});

// Success route
app.get('/success', (req, res) => {
    res.render('success');
});

// Login route
app.get('/login', (req, res) => {
    res.render('login');
});

// Register route
app.get('/register', (req, res) => {
    res.render('register');
});

// Register POST route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('register', { error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/success');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).render('register', { error: 'Failed to register' });
    }
});

// // Login POST route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Admin login check
//         if (email === 'admin@gmail.com' && password === 'admin') {
//             req.session.user = { email, role: 'admin' }; // Set a session variable for admin
//             return res.redirect('/admin/uploading'); // Redirect to admin upload page
//         }

//         // User login check
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).render('login', { error: 'Invalid email or password' });
//         }

//         req.session.user = { id: user._id, username: user.username };
//         res.redirect('/user/home'); // Redirect to user dashboard
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).render('login', { error: 'Failed to log in' });
//     }
// });

// Login POST route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Admin login check
        if (email === 'admin@gmail.com' && password === 'admin') {
            req.session.user = { email, role: 'admin' }; // Set a session variable for admin
            return res.redirect('/admin/uploading'); // Redirect to admin upload page
        }

        // User login check
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).render('login', { error: 'Invalid email or password' });
        }

        // Set session for regular user
        req.session.user = { id: user._id, username: user.username, role: 'user' }; // Include user role
        res.redirect('/user/dashboard'); // Redirect to user dashboard
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('login', { error: 'Failed to log in' });
    }
});


// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Could not log out. Please try again.');
        }
        res.redirect('/');
    });
});

// Use admin and user routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// 404 Error handling
app.use((req, res) => {
    res.status(404).render('404');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



