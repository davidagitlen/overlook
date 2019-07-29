import domUpdates from './domUpdates';

class Customer {
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}

	findMyOrders(hotel) {
		return hotel.roomServices.filter(service => 
			service.userID === this.id);
	}

	showMyOrders(hotel) {
		let myOrders = this.findMyOrders(hotel);
		return myOrders.length ? 
		domUpdates.displayCustomerOrders(this, hotel, myOrders) : 
		domUpdates.noCustomerOrdersFound();
	}

	findMyOrdersTotal(hotel) {
		return this.findMyOrders(hotel).reduce((tab, order) =>
			tab + order.totalCost, 0).toFixed(2)
	}

	findMyBookings(hotel) {
		return hotel.bookings.filter(booking => 
			booking.userID === this.id);
	}

	showMyBookings(hotel) {
		let myBookings = this.findMyBookings(hotel);
		return myBookings.length ? 
		domUpdates.displayCustomerBookings(this, hotel, myBookings) :
		domUpdates.noCustomerBookingsFound();
	}

}

export default Customer;