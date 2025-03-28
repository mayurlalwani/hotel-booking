const bookingService = require("../services/bookingService");

beforeEach(() => {
    // Reset in-memory bookings before each test
    // Clear existing bookings and reset rooms
    const rooms = Array.from({ length: 10 }, (_, i) => ({ roomNumber: i + 1, booked: false, guest: null }));
    global.rooms = rooms;
    global.bookings = [];
});

test("should book a room successfully", () => {
    const booking = bookingService.bookRoom({
        name: "Alice",
        email: "alice@example.com",
        checkIn: "2025-04-01",
        checkOut: "2025-04-05"
    });

    expect(booking).toHaveProperty("roomNumber", 1);
    expect(booking.name).toBe("Alice");
    expect(booking.email).toBe("alice@example.com");
    expect(booking.checkIn).toBe("2025-04-01");
    expect(booking.checkOut).toBe("2025-04-05");
});

test("should retrieve a booking by email", () => {
    bookingService.bookRoom({
        name: "Bob",
        email: "bob@example.com",
        checkIn: "2025-05-01",
        checkOut: "2025-05-05"
    });
    
    const booking = bookingService.getBookingByEmail("bob@example.com");

    expect(booking).toBeDefined();
    expect(booking.name).toBe("Bob");
    expect(booking.email).toBe("bob@example.com");
});

test("should return undefined for non-existent booking", () => {
    const booking = bookingService.getBookingByEmail("nonexistent@example.com");
    expect(booking).toBeUndefined();
});

test("should cancel a booking successfully", () => {
    bookingService.bookRoom({
        name: "Charlie",
        email: "charlie@example.com",
        checkIn: "2025-06-01",
        checkOut: "2025-06-05"
    });
    
    const result = bookingService.cancelBooking("charlie@example.com");
    
    expect(result).toEqual({ message: 'Booking canceled successfully' });
    expect(bookingService.getBookingByEmail("charlie@example.com")).toBeUndefined();
});

test("should return error when trying to cancel a non-existent booking", () => {
    const result = bookingService.cancelBooking("unknown@example.com");
    expect(result).toEqual({ error: 'Booking not found' });
});

test("should modify booking dates successfully", () => {
    bookingService.bookRoom({
        name: "David",
        email: "david@example.com",
        checkIn: "2025-07-01",
        checkOut: "2025-07-05"
    });

    const modified = bookingService.modifyBooking("david@example.com", {
        checkIn: "2025-07-02",
        checkOut: "2025-07-06"
    });

    expect(modified).toBeDefined();
    expect(modified.checkIn).toBe("2025-07-02");
    expect(modified.checkOut).toBe("2025-07-06");
});

test("should return error when modifying non-existent booking", () => {
    const result = bookingService.modifyBooking("unknown@example.com", {
        checkIn: "2025-08-01"
    });
    expect(result).toEqual({ error: 'Booking not found' });
});
