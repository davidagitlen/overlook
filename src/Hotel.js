class Hotel {
	constructor(users, rooms, bookings, roomServices, today) {
		this.users = users.users;
		this.rooms = rooms.rooms;
		this.bookings = bookings.bookings;
		this.roomServices = roomServices.roomServices;
		this.currentDate = today;
	}

	getCurrentDate() {
		let today = new Date();
		let year = today.getFullYear();
		let month = String(today.getMonth() + 1).padStart(2, '0');
		let day = String(today.getDate()).padStart(2, '0');
		return `${year}/${month}/${day}`
	}

	getTodaysBookings(date = this.currentDate) {
		return this.bookings.filter(booking => booking.date === date);
	}

	getTodaysRoomServices(date = this.currentDate) {
		return this.roomServices.filter(service => service.date === date);
	}

	getUnoccupiedRooms(date = this.currentDate) {
		let todaysBookings = this.bookings.filter(booking => booking.date === date);
		let availableRooms = this.rooms.filter(room => 
			!todaysBookings.some(booking => booking.roomNumber === room.number));
		return availableRooms;
	}

	getTotalRevenue(date = this.currentDate) {
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
		return (roomServicesTotal + roomTotal).toFixed(2);
	}

	getPercentageOccupied(date = this.currentDate) {
		let todaysBookings = this.getTodaysBookings(date);
		return (todaysBookings.length/this.rooms.length).toFixed(2) * 100
	}

}

export default Hotel;