const express = require("express");
const {registerUser, loginUser, forgotPassword} = require("../controllers/userController");
const {submitQuery} = require("../controllers/queryController");
const {searchFlights} = require("../controllers/flightController");
const {createBooking} = require('../controllers/bookingController');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/changePassword', authMiddleware, forgotPassword);
router.post('/submitQuery', authMiddleware, submitQuery);
// router.put('/resolveQuery/:queryId', authMiddleware, resolveQuery);
router.get('/searchFlights', searchFlights);
router.post('/bookTicket', authMiddleware, createBooking);

module.exports = router;