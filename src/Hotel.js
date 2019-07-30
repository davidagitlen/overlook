import domUpdates from './domUpdates';

class Hotel {
	constructor(users, rooms, bookings, roomServices, today) {
		this.users = users;
		this.rooms = rooms;
		this.bookings = bookings;
		this.roomServices = roomServices;
		this.currentDate = today;
	}

	getBookingsByDate(date = this.currentDate) {
		return this.bookings.filter(booking => booking.date === date);
		console.log('bookings today', this.bookings.filter(booking => booking.date === date));
	}

	getRoomServicesByDate(date = this.currentDate) {
		return this.roomServices.filter(service => service.date === date);
	}

	getOccupiedRooms(date = this.currentDate) {
		let todaysBookings = this.getBookingsByDate(date);
		let takenRooms = this.rooms.filter(room => 
			todaysBookings.some(booking => booking.roomNumber === room.number));
		console.log('todaysBookings', todaysBookings);
		console.log('takenRooms variable', takenRooms);
		return takenRooms;
	}

	getUnoccupiedRooms(date = this.currentDate) {
		let todaysBookings = this.getBookingsByDate(date);
		let availableRooms = this.rooms.filter(room => 
			!todaysBookings.some(booking => booking.roomNumber === room.number));
		return availableRooms;
	}

	getTotalRevenue(date = this.currentDate) {
		let todaysRoomServices = this.getRoomServicesByDate(date);
		let takenRooms = this.getOccupiedRooms(date);
		let roomServicesTotal = todaysRoomServices.reduce((tab, service) => {
			return tab + service.totalCost;
		}, 0);
		let roomTotal = takenRooms.reduce((bill, room) => {
			return bill + room.costPerNight;
		}, 0);
		return (roomServicesTotal + roomTotal).toFixed(2);
	}

	getPercentageOccupied(date = this.currentDate) {
		let todaysBookings = this.getBookingsByDate(date);
		return (todaysBookings.length/this.rooms.length).toFixed(2) * 100
	}

	findCustomer(name) {
		let regex = new RegExp(`${name}`, 'gi');
		let foundUsers = this.users.filter(user => 
			user.name.match(regex));
		return foundUsers.length ? 
		domUpdates.displayUsers(foundUsers) : 
		domUpdates.noUserFound();
	}

}

export default Hotel;