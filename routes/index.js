// Importing router from express
const router = require('express').Router();
// Importing api routes
const apiRoutes = require('./api');

// Saying to use /api folder for api routes
router.use('/api', apiRoutes);

// exporting router
module.exports = router;