import domUpdates from './domUpdates';

class Room {
	constructor() {
		this.unconfirmedBookings = [];
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

	storeUnconfirmedBookings(booking) {
		this.unconfirmedBookings.push(booking);
	}

	makeNewBooking(hotel) {
		this.unconfirmedBookings.forEach(booking => hotel.bookings.push(booking));
		console.log('hotel bookings', hotel.bookings);
	}

}

export default Room;