const bookingService = require('../services/bookingService');

const bookRoom = (req, res) => {
    const { name, email, checkIn, checkOut } = req.body;

    if (!name || !email || !checkIn || !checkOut) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = bookingService.bookRoom(req.body);
    if (booking.error) return res.status(400).json({ message: booking.error });

    res.json({ message: 'Room booked successfully', booking });
};

const getBooking = (req, res) => {
    const booking = bookingService.getBookingByEmail(req.params.email);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json(booking);
};

const getAllGuests = (req, res) => {
    res.json(bookingService.getAllGuests());
};

const cancelBooking = (req, res) => {
    const { email } = req.body;
    const result = bookingService.cancelBooking(email);
    if (result.error) return res.status(404).json({ message: result.error });

    res.json(result);
};

const modifyBooking = (req, res) => {
    const { email, checkIn, checkOut } = req.body;
    const booking = bookingService.modifyBooking(email, { checkIn, checkOut });

    if (booking.error) return res.status(404).json({ message: booking.error });

    res.json({ message: 'Booking updated successfully', booking });
};

module.exports = { bookRoom, getBooking, getAllGuests, cancelBooking, modifyBooking };
