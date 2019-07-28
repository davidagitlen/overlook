import domUpdates from './domUpdates';

class Customer {
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}

	findMyOrders(hotel) {
		return hotel.roomServices.filter(service => service.userID === this.id);
	}

	showMyOrders(hotel) {
		let myOrders = this.findMyOrders(hotel);
		console.log(myOrders);
		return myOrders.length ? domUpdates.displayCustomerOrders(this, hotel, myOrders) : domUpdates.noOrdersFound();
	}

	findMyTotal(hotel) {
		return this.findMyOrders(hotel).reduce((tab, order) => 
			tab + order.totalCost, 0).toFixed(2)
	}


}

export default Customer;