import domUpdates from './domUpdates';

class Order {
	constructor(today) {
		this.currentDate = today;
	}

	getOrders(hotel, date = this.currentDate) {
		let orders = hotel.getRoomServicesByDate(date);
		let bookings = hotel.getBookingsByDate(date);
		let fullOrderInfo = orders.map(order => {
			return {
				user: hotel.users.find(user => user.id === order.userID).name,
				room: bookings.find(booking => booking.userID === order.userID).roomNumber,
				item: order.food,
				price: order.totalCost
				 };
		});
		return fullOrderInfo;
	}

	showOrders(hotel, date = this.currentDate) {
		let currentOrders = this.getOrders(hotel, date);
		return currentOrders.length ? 
		domUpdates.defaultOrders(currentOrders, date) : 
		domUpdates.defaultNoOrders(date);
	}

}

export default Order;