// // routes/userRoutes.js
// const express = require('express');
// const router = express.Router();

// // User dashboard route
// router.get('/dashboard', (req, res) => {
//     if (req.session.user) {
//         res.render('user/dashboard', { username: req.session.user.username });
//     } else {
//         res.redirect('/login');
//     }
// });

// // User home route
// router.get('/home', (req, res) => {
//     if (req.session.user) {
//         res.render('user/home');
//     } else {
//         res.redirect('/login');
//     }
// });

// module.exports = router;


// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.role === 'user') {
        return next();
    }
    res.redirect('/login');
}

// User Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('user/dashboard', { username: req.session.user.username });
});

module.exports = router;
