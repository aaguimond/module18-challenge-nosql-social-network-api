// importing our router from express
const router = require('express').Router();
// importing user routes from our userRoutes
const userRoutes = require('./userRoutes');
// importing thought routes from our thoughtRoutes
const thoughtRoutes = require('./thoughtRoutes');

// Telling our API to use userRoutes for user URLs and thoughtRoutes for thought URLs
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// exporting our router
module.exports = router