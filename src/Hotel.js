class Hotel {
	constructor(users, rooms, bookings, roomServices) {
		this.users = users;
		this.rooms = rooms;
		this.bookings = bookings;
		this.roomServices = roomServices;
		this.currentDate = this.getCurrentDate();
	}

	getCurrentDate() {
		let today = new Date();
		let year = today.getFullYear();
		let month = String(today.getMonth() + 1).padStart(2, '0');
		let day = String(today.getDate()).padStart(2, '0');
		return `${year}/${month}/${day}`
	}

	getTodaysBookings(date) {
		return this.bookings.filter(booking => booking.date === date);
	}

	getTodaysRoomServices(date) {
		return this.roomServices.filter(service => service.date === date);
	}

	getUnoccupiedRooms(date) {
		let todaysBookings = this.bookings.filter(booking => booking.date === date);
		let availableRooms = this.rooms.filter(room => 
			!todaysBookings.some(booking => booking.roomNumber === room.number));
		return availableRooms;
	}

	getTotalRevenue(date) {
		let todaysBookings = this.getTodaysBookings(date);
		let todaysRoomServices = this.getTodaysRoomServices(date);
		let takenRooms = this.rooms.filter(room => 
			todaysBookings.some(booking => booking.roomNumber === room.number));
		let roomServicesTotal = todaysRoomServices.reduce((tab, service) => {
			return tab + service.totalCost;
		}, 0);
		let roomTotal = takenRooms.reduce((bill, room) => {
			return bill + room.costPerNight;
		}, 0);
		return roomServicesTotal + roomTotal
	}

}

export default Hotel;