const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book-room', bookingController.bookRoom);
router.get('/booking/:email', bookingController.getBooking);
router.get('/guests', bookingController.getAllGuests);
router.delete('/cancel-booking', bookingController.cancelBooking);
router.put('/modify-booking', bookingController.modifyBooking);

module.exports = router;
