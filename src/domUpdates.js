import $ from 'jquery';

let domUpdates = {

	displayCurrentDate() {
	let today = new Date();
	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return today.toLocaleDateString('en-US', options);
	},

	defaultMainTab(hotel) {
		let mainDefault = `
		<div>
		<p id="current-date">${this.displayCurrentDate()}</p>
		<p id="unoccupied-rooms"><span>Total Unoccupied Rooms : </span>${hotel.getUnoccupiedRooms().length}<p>
		<p id="total-revenue"><span>Total Revenue : </span>$${hotel.getTotalRevenue()}</p>
		<p id="occupied-perc"><span>Percentage of Rooms Occupied : </span> ${hotel.getPercentageOccupied()}%</p>
		</div>`;
		$('#main').html(mainDefault)
	}, 

	displayUsers(users) {
		let usersList = `<p>Please select one of the following customers:</p>`;
		users.forEach(user => 
			usersList += `<button class="user-list" id="user-list" data-user="${user.name}">${user.name}</button><br>`);
		return usersList;
	},

	noUserFound() {
		let message = `
		<p> We didn't find a current customer with that name.</p>
		<p> Please use the form below to enter them into the system</p>
		<form autocomplete="off">
			<fieldset>
				<legend>New Customer Entry</legend>
				<label for="new-customer-name">New Customer Name</label>
				<input type="text" id="new-customer-name" placeholder="Enter New Customer Name" autocomplete="off">
			</fieldset>
		</form>`;
		return message;
	},

	displayCustomerName(e) {
		let customerAlert = `
		<p><span>Currently Viewing : </span>${e.target.dataset.user}</p>`
		$('#customer').empty().append(customerAlert);
	},

	defaultOrders(orders, date) {
		let ordersDefault = ``;
		orders.forEach(order => ordersDefault += `<p>On ${date} ${order.user} ordered one ${order.item} for $${order.price.toFixed(2)}</p>`);
		ordersDefault += `
		<form>
			<fieldset>
				<legend>Find Another Date's Orders</legend>
				<label for="new-date-orders">Search Orders on a Specific Date</label>
				<input type="text" id="new-date-orders" placeholder="yyyy/mm/dd">
			</fieldset>
		</form>`;
		$('#roomservice').append(ordersDefault);
	},

	defaultNoOrders(date) {
		let noOrdersMessage = `<p>No orders placed for ${date}!</p>`;
		noOrdersMessage += `
		<form>
			<fieldset>
				<legend>Find Another Date's Orders</legend>
				<label for="new-date-orders">Search Orders on a Specific Date</label>
				<input type="text" id="new-date-orders" placeholder="yyyy/mm/dd">
			</fieldset>
		</form>`;
		$('#roomservice').append(noOrdersMessage);
	},

	displayCustomerOrders(user, hotel, userOrders) {
		console.log(user, userOrders)
		let ordersList = `<p>Here are all of ${user.name}'s orders:<p>`;
		userOrders.forEach(order => 
			ordersList += `<p><span>Date : </span>${order.date} <span>Order : </span>${order.food} <span>Price : </span> $${order.totalCost.toFixed(2)}</p>`);
		ordersList += `<p>${user.name} has spent $${user.findMyOrdersTotal(hotel)} on room service over the course of their stays at your hotel.</p>`
		return ordersList;
	},

	noCustomerOrdersFound() {
		let noCustomerOrdersMessage = `
		<p> We didn't find any orders placed for that customer. </p>`
		return noCustomerOrdersMessage;
	},

	defaultRoomTab(best, worst) {
		let bookingsMessage = `
		<p>The most popular recent date at your hotel was ${best.date} with ${best.bookings} bookings.</p><br>
		<p> The least popular recent date at your hotel was ${worst.date} with ${worst.bookings} bookings.</p>
		<form id="bookings-search">
			<fieldset>
				<legend>Find Another Date's Bookings</legend>
				<label for="new-date-bookings">Search Bookings on a Specific Date</label>
				<input type="text" id="new-date-bookings" placeholder="yyyy/mm/dd">
			</fieldset>
		</form>`
		$('#room').append(bookingsMessage);
	},

	displayAvailableRoomsByDate(date, rooms) {
		let roomsAvailableMessage = `
		<div id="bookings-dropdown">
		<p>The following rooms are available on ${date}</p>
		<select id="rooms-by-date">
			<option>Available Rooms</option>`;
		rooms.forEach(room => 
			roomsAvailableMessage += `<option value="">Room Number ${room.number}</option>`);
		roomsAvailableMessage += `</select>
		</div>`
		$('#bookings-search').append(roomsAvailableMessage);
	}, 

	displayCustomerBookings(user, hotel, userBookings) {
		let sortedBookings = userBookings.sort((a, b) => parseInt(a.date.slice(-5,-3) + a.date.slice(-2)) - parseInt(b.date.slice(-5,-3) + b.date.slice(-2)));
		let bookingsList = `
		<div id="user-bookings">
		<p>Here are all of ${user.name}'s bookings:<p>`;
		sortedBookings.forEach(booking => 
			bookingsList += `<p><span>Date : </span>${booking.date} <span> Room : </span>${booking.roomNumber}</p>`);
		bookingsList += `</div>`
		if (!sortedBookings.find(booking => booking.date === hotel.currentDate)) {
			bookingsList += '<button id="booking-button">New Booking</button>';
		}
		return bookingsList;
	},

	noCustomerBookingsFound() {
		let noCustomerBookingsMessage = `
		<p> We didn't find any bookings for that customer. </p>`;
		return noCustomerBookingsMessage;
	},

	displayRoomFilter() {
		let filterMenu = `
				<form id="room-filter-form">
					<fieldset>
					<legend>Select Room Type</legend>
					<p>Please select the desired room type</p>
					<input type="radio" id="single-room" value="single room" name="room-type" tabindex = "0">
					<label for="single-room" tabindex = "0">Single Room</label>
					<input type="radio" id="junior-suite" value="junior suite" name="room-type" tabindex = "0">
					<label for="junior-suite" tabindex = "0">Junior Suite</label>
					<input type="radio" id="suite" value="suite" name="room-type" tabindex = "0">
					<label for="suite" tabindex = "0">Suite</label>
					<input type="radio" id="residential-suite" value="residential suite" name="room-type" tabindex = "0">
					<label for="residential-suite" tabindex = "0">Residential Suite</label>
					<button id="filter-room-type" tabindex = "0">Filter Rooms</button>
					</fieldset>
				</form>`;
		$('#room').append(filterMenu);
	},

	displayFilteredRooms(rooms) {
		let roomList = `
		<div id="room-list">
		<p> We found the following rooms of that type available today: </p>`;
		rooms.forEach(room => {
			let bedMessage = room.numBeds > 1 ? ` with ${room.numBeds} ${room.bedSize} beds` : ` with 1 ${room.bedSize} bed`;
			let bidetMessage = room.bidet === true ? `and a bidet.` : `without a bidet.`;
			roomList += `<button data-number="${room.number}"> Room ${room.number}, a ${room.roomType}, ${bedMessage}, ${bidetMessage}</button>`
		});
		roomList += `</div>`;
		$('#room').append(roomList); 
	},

	displayRoomTypeUnavailable(rooms) {
		let roomTypeUnavailableList = `
		<p> Unfortunately no rooms of that type are available, here is a list of the available rooms</p>`;
		rooms.forEach(room => {
			let bedMessage = room.numBeds > 1 ? ` with ${room.numBeds} ${room.bedSize} beds` : ` with 1 ${room.bedSize} bed`;
			let bidetMessage = room.bidet === true ? `with a bidet.` : `without a bidet.`;
			roomList += `<p> Room ${room.roomNumber}, a ${room.roomType}, with ${bedMessage} ${bidetMessage}`
		});
		$('#room').append(roomTypeUnavailableList);
	}


}

export default domUpdates;