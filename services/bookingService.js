// In-memory storage
const rooms = Array.from({ length: 10 }, (_, i) => ({ roomNumber: i + 1, booked: false, guest: null }));
const bookings = [];

// Find an available room
const findAvailableRoom = () => rooms.find(room => !room.booked);

const bookRoom = ({ name, email, checkIn, checkOut }) => {
    const availableRoom = findAvailableRoom();
    if (!availableRoom) return { error: 'No rooms available' };

    // Assign room and store booking
    availableRoom.booked = true;
    availableRoom.guest = { name, email, checkIn, checkOut };
    const booking = { roomNumber: availableRoom.roomNumber, name, email, checkIn, checkOut };
    bookings.push(booking);

    return booking;
};

const getBookingByEmail = (email) => bookings.find(b => b.email === email);

const getAllGuests = () => rooms
    .filter(room => room.booked)
    .map(room => ({ roomNumber: room.roomNumber, name: room.guest.name, email: room.guest.email }));

const cancelBooking = (email) => {
    const bookingIndex = bookings.findIndex(b => b.email === email);
    if (bookingIndex === -1) return { error: 'Booking not found' };

    // Free up the room
    const room = rooms.find(r => r.roomNumber === bookings[bookingIndex].roomNumber);
    if (room) {
        room.booked = false;
        room.guest = null;
    }

    // Remove booking
    bookings.splice(bookingIndex, 1);
    return { message: 'Booking canceled successfully' };
};

const modifyBooking = (email, { checkIn, checkOut }) => {
    const booking = bookings.find(b => b.email === email);
    if (!booking) return { error: 'Booking not found' };

    booking.checkIn = checkIn || booking.checkIn;
    booking.checkOut = checkOut || booking.checkOut;

    return booking;
};

module.exports = { bookRoom, getBookingByEmail, getAllGuests, cancelBooking, modifyBooking };
