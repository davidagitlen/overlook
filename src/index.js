import $ from 'jquery';
import './css/base.scss';
import './images/another-bell.svg';
import './images/guest.svg';
import './images/hotel-key.svg';
import './images/room-service.svg';
import './images/bell.gif';
import Hotel from './Hotel';
import Customer from './Customer';
import Room from './Room';
import Order from './Order';

let usersAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
let roomsAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms');
let bookingsAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings');
let roomServicesAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices'); 
let today = getCurrentDate();
let currentHotel = null;
let currentCustomer = null;
let currentOrder = new Order(today);
let currentRoom = new Room();

Promise.all([usersAPICall, roomsAPICall, bookingsAPICall, roomServicesAPICall])
  .then(values => Promise.all(values.map(value => value.json())))
  .then(finalData => {
  	let users = finalData.find(data => data.hasOwnProperty('users')).users;
  	let rooms = finalData.find(data => data.hasOwnProperty('rooms')).rooms;
  	let bookings = finalData.find(data => data.hasOwnProperty('bookings')).bookings;;
  	let roomServices = finalData.find(data => data.hasOwnProperty('roomServices')).roomServices;
  	currentHotel = new Hotel(users, rooms, bookings, roomServices, today);
	});

$('.splash').show(0).delay(3000).hide(0);
$('.tab-content').hide();
$('#main').show();
$('#main-tab, #customer-tab, #room-tab, #roomservice-tab').on('click', showTabContent);
$('#customer-name-field').on('keypress', handleCustomerSearch);
$('#customer').on('click', handleCustomerClick);
$('#customer').on('keypress', handleCustomerKeypress);
$('#room').on('keypress', handleRoomInput);
$('#room').on('click', handleRoomInput);
$('#roomservice').on('keypress', handleOrderSearch);
$('#roomservice').on('click', handleNewOrder);

setTimeout(() => {
	defaultMainTab(currentHotel);
	currentOrder.showOrders(currentHotel);
	currentRoom.showPolarDates(currentHotel);
}, 3000);

function getCurrentDate() {
	let today = new Date();
	let year = today.getFullYear();
	let month = String(today.getMonth() + 1).padStart(2, '0');
	let day = String(today.getDate()).padStart(2, '0');
	return `${year}/${month}/${day}`
}

function displayCurrentDate() {
let today = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
return today.toLocaleDateString('en-US', options);
}

function defaultMainTab(hotel) {
	let mainDefault = `
	<div>
	<p id="current-date">${displayCurrentDate()}</p>
	<p id="unoccupied-rooms"><span>Total Unoccupied Rooms : </span>${hotel.getUnoccupiedRooms().length}<p>
	<p id="total-revenue"><span>Total Revenue : </span>$${hotel.getTotalRevenue()}</p>
	<p id="occupied-perc"><span>Percentage of Rooms Occupied : </span> ${hotel.getPercentageOccupied()}%</p>
	</div>`;
	$('#main').html(mainDefault)
}

function showTabContent(e) {
	let id = e.target.id.split('-')[0];
	$('.tab-content').hide();
	$(`#${id}`).show();
}

function handleCustomerSearch(e) {
	if (e.which === 13 && !$('#customer-name-field').val()) {
		e.preventDefault();
	}
	else if (e.which === 13) {
		e.preventDefault();
		let name = $('#customer-name-field').val();
		$('#customer').html(currentHotel.findCustomer(name));
		$('#customer-name-field').val('');
	}
}

function handleCustomerClick(e) {
	if (e.target.id === 'user-list') {
		handleCustomerInstantiation(e)
	}
}

function handleCustomerKeypress(e) {
	if (e.which === 13 && e.target.id === 'user-list') {
		handleCustomerInstantiation(e);
	}
	if (e.which === 13 && e.target.id === 'new-customer-name') {
		enterNewCustomer(e);
	}
}

function handleOrderSearch(e) {
	if (e.which === 13 && !$('#new-date-orders').val()) {
		e.preventDefault();
	}
	if (e.which === 13) {
		e.preventDefault();
		let orderDate = $('#new-date-orders').val();
		$('#roomservice').empty();
		currentOrder.showOrders(currentHotel, orderDate);
	}
}

function handleRoomInput(e) {
	if (e.which === 13 && e.target.id === "new-date-bookings" && !$('#new-date-bookings').val()) {
		e.preventDefault();
	}
	if (e.which === 13 && e.target.id === "new-date-bookings") {
		e.preventDefault();
		displayAvailableRooms(e);
	}
	if ((e.which === 13 || 1 || 2 || 3) && e.target.id === "booking-button") {
		e.preventDefault();
		openRoomFilterForm(e);
	}
	if ((e.which === 13 || 1 || 2 || 3) && e.target.type === "radio") {
		$('#filter-room-type').attr("data-room", e.target.value);
	}
	if ((e.which === 13 || 1 || 2 || 3)	 && e.target.id === "filter-room-type") {
		e.preventDefault();
		let roomsAvailable = currentHotel.getUnoccupiedRooms();
		let desiredRoom = e.target.dataset.room;
		let filteredRoomsAvailable = roomsAvailable.filter(room => room.roomType === desiredRoom)
		filteredRoomsAvailable.length ? 
		displayFilteredRooms(filteredRoomsAvailable) : 
		displayRoomTypeUnavailable(roomsAvailable);
	}
	if ((e.which === 13 || 1 || 2 || 3) && e.target.classList.contains("room-booking")) {
		e.preventDefault();
		let selectedRoomNumber = e.target.dataset.number; 
		let newBookingObject = {userID: currentCustomer.id, date: today, roomNumber: selectedRoomNumber};
		currentRoom.makeNewBooking(currentHotel, newBookingObject);
		if (!$('#menu-button').length) {
		let menuButton = `<button id="menu-button">View Room Service Menu</button>`;
		$('#room-list').append(menuButton);
		}
	}
	if ((e.which === 13 || 1 || 2 || 3)	 && e.target.id === "menu-button") {
		e.preventDefault();
		let menuItems = [...new Set(currentHotel.roomServices.map(item => {
			return {food: item.food, price: item.totalCost}
		}))];
		displayMenu(menuItems);
	}

}

function openRoomFilterForm(e) {
	e.preventDefault();
	displayRoomFilter();
	$('#booking-button').hide();
}

function displayAvailableRooms(e) {
	e.preventDefault();
	let bookingsDate = $('#new-date-bookings').val();
	$('#bookings-dropdown').remove();
	let roomsAvailable = currentHotel.getUnoccupiedRooms(bookingsDate);
	displayAvailableRoomsByDate(bookingsDate, roomsAvailable);
	$('#new-date-bookings').val('');
}

function handleCustomerInstantiation(e) {
	instantiateCustomer(e);
	displayCustomerName(e);
	$('#roomservice').html(currentCustomer.showMyOrders(currentHotel));
	$('#room').html(currentCustomer.showMyBookings(currentHotel));
}

function instantiateCustomer(e) {
	let customer = currentHotel.users.find(user => user.name === e.target.dataset.user);
	currentCustomer = new Customer(customer.name, customer.id);
}

function enterNewCustomer(e) {
	if (e.which === 13 && !$('#customer-name-field').val()) {
		e.preventDefault();
	}
	if (e.which === 13) {
		e.preventDefault();
		let brandNewCustomer = {id: currentHotel.users.length + 1, name: $('#new-customer-name').val()};
		currentHotel.users.push(brandNewCustomer);
		$('#new-customer-name').attr("data-user", $('#new-customer-name').val());
		handleCustomerInstantiation(e);
	}
}


function displayCustomerName(e) {
	let customerAlert = `
	<p><span>Currently Viewing : </span>${e.target.dataset.user}</p>`
	$('#customer').empty().append(customerAlert);
}

function displayFilteredRooms(rooms) {
	let roomList = `
	<div id="room-list">
	<p> We found the following rooms of that type available today: </p>`;
	rooms.forEach(room => {
		let bedMessage = room.numBeds > 1 ? ` with ${room.numBeds} ${room.bedSize} beds` : ` with 1 ${room.bedSize} bed`;
		let bidetMessage = room.bidet === true ? `and a bidet.` : `without a bidet.`;
		roomList += `<button class="room-booking" data-number="${room.number}"> Room ${room.number}, a ${room.roomType}, ${bedMessage}, ${bidetMessage}</button>`
	});
	roomList += `</div>`;
	$('#room').append(roomList); 
}

function displayRoomTypeUnavailable(rooms) {
	let roomTypeUnavailableList = `
	<div id="room-list">
	<p> Unfortunately no rooms of that type are available, here is a list of the available rooms</p>`;
	rooms.forEach(room => {
		let bedMessage = room.numBeds > 1 ? ` with ${room.numBeds} ${room.bedSize} beds` : ` with 1 ${room.bedSize} bed`;
		let bidetMessage = room.bidet === true ? `and a bidet.` : `without a bidet.`;
		roomTypeUnavailableList += `<button class="room-booking" data-number="${room.number}"> Room ${room.number}, a ${room.roomType}, ${bedMessage}, ${bidetMessage}</button>`;
	});
	roomTypeUnavailableList += `</div>`;
	$('#room').append(roomTypeUnavailableList);
}

function displayMenu(menu) {
	// let itemsList = `
	// <div id="menu-list">
	// <p> Here are the items available today!</p>`;
	// menu.forEach(item => {
	// 	itemsList += `<p> ${item.food} : A delicious ${item.food.split(' ').slice(1)[0].toLowerCase()} ${item.food.split(' ').slice(2)[0].toLowerCase()} on ${item.food.split(' ').shift().toLowerCase()} bread. Price: $${item.price.toFixed(2)}`
	// });
	// itemsList += `</div>`
	// $('#room').append(itemsList);
	let menuTable = `
	<table id="menu-table">
		<thead>
			<tr>
				<th colspan="3">Here are the items available today!:</th>
			<tr>
		<thead>
		<tbody>
			<tr>
				<td>Menu Item</td><td>Description</td><td>Price</td>
			</tr>`;
	menu.forEach(item => {
		menuTable += `<tr><td><button class="menu-item-button" data-food="${item.food}" data-price="${item.price}">${item.food}</button></td><td>A delicious ${item.food.split(' ').slice(1)[0].toLowerCase()} ${item.food.split(' ').slice(2)[0].toLowerCase()} on ${item.food.split(' ').shift().toLowerCase()} bread.</td><td>$${item.price.toFixed(2)}</td>`;
	});
	menuTable += `
		</tbody>
	<table>`;
	$('#roomservice').empty().append(menuTable);
	$('.tab-content').hide();
	$('#roomservice').show();
}

function displayRoomFilter() {
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
}

function displayAvailableRoomsByDate(date, rooms) {
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
}

setTimeout(() => {
	console.log(currentHotel);
}, 3000) 