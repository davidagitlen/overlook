import domUpdates from './domUpdates';

class Order {
	constructor(today) {
		this.currentDate = today;
	}

	getOrders(hotel, date = this.currentDate) {
		return hotel.roomServices.filter(service => service.date === date);
	}

	showOrders(hotel, date = this.currentDate) {
		let currentOrders = this.getOrders(hotel, date);
		return currentOrders.length ? 
		domUpdates.defaultOrders(currentOrders) : 
		domUpdates.defaultNoOrders(date);
	}

}

export default Order;