import domUpdates from './domUpdates';

class Room {
	constructor() {
	}

	findMostPopularDate(hotel) {
		let allDates = [...new Set(hotel.bookings.map(booking => booking.date))];
		return allDates.reduce((bookings, day) =>{
			let stays = hotel.getBookingsByDate(day).length;
			if (stays > bookings.bookings) {
				bookings.date = day;
				bookings.bookings = stays;
			}
			return bookings;
		}, {date: null, bookings: 0});
	}

	findLeastPopularDate(hotel) {
		let allDates = [...new Set(hotel.bookings.map(booking => booking.date))];
		return allDates.reduce((bookings, day) => {
			let stays = hotel.getBookingsByDate(day).length;
			if (stays <= bookings.bookings) {
				bookings.date = day;
				bookings.bookings = stays;
			}
			return bookings;
		}, {date: null, bookings: 50});
	}

	showPolarDates(hotel) {
		let bestDate = this.findMostPopularDate(hotel);
		let worstDate = this.findLeastPopularDate(hotel);
		domUpdates.defaultRoomTab(bestDate, worstDate);
	}

	makeNewBooking(hotel, booking) {
		hotel.bookings.push(booking);
	}

	cancelBooking(hotel, cancellation) {
		console.log(hotel.bookings)
		let revisedBookings = hotel.bookings.filter(booking => (booking.userID !== cancellation.userID && booking.date !== cancellation.date && booking.roomNumber !== cancellation.roomNumber));
		console.log(revisedBookings)
		hotel.bookings = revisedBookings;
	}

}

export default Room;