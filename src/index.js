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
import domUpdates from './domUpdates';

let today = getCurrentDate();
let usersAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
let roomsAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms');
let bookingsAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings');
let roomServicesAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices'); 
let currentHotel = null;
let currentCustomer = null;
let currentOrder = new Order();
let currentRoom = new Room();

Promise.all([usersAPICall, roomsAPICall, bookingsAPICall, roomServicesAPICall])
  .then(values => Promise.all(values.map(value => value.json())))
  .then(finalData => {
  	let users = finalData.find(data => data.hasOwnProperty('users'));
  	let rooms = finalData.find(data => data.hasOwnProperty('rooms'))
  	let bookings = finalData.find(data => data.hasOwnProperty('bookings'));
  	let roomServices = finalData.find(data => data.hasOwnProperty('roomServices'));
  	currentHotel = new Hotel(users, rooms, bookings, roomServices, today);
	});

$('.splash').show(0).delay(3000).hide(0);
$('.tab-content').hide();
$('#main').show();
$('#main-tab, #customer-tab, #room-tab, #roomservice-tab').on('click', showTabContent);
$('#customer-name-field').on('keypress', handleCustomerSearch);
$('#customer').on('click', handleCustomerClick);
$('#customer').on('keypress', enterNewCustomer);

setTimeout(() => {
	domUpdates.defaultMainTab(currentHotel);
}, 3000)

function	getCurrentDate() {
	let today = new Date();
	let year = today.getFullYear();
	let month = String(today.getMonth() + 1).padStart(2, '0');
	let day = String(today.getDate()).padStart(2, '0');
	return `${year}/${month}/${day}`
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
		console.log(name)
		$('#customer').html(currentHotel.findCustomer(name));
	}
}

function handleCustomerClick(e) {
	if (e.target.id === "user-list") {
		handleCustomerInstantiation(e)
	}
}

function handleCustomerInstantiation(e) {
	instantiateCustomer(e);
	domUpdates.displayCustomerName(e);
	$('#roomservice').html(currentCustomer.showMyOrders(currentHotel));
}

function instantiateCustomer(e) {
	let customer = currentHotel.users.find(user => user.name === e.target.dataset.user);
	currentCustomer = new Customer(customer.name, customer.id);
	console.log('current customer instance', currentCustomer);
	}

function enterNewCustomer(e) {
	if (e.which === 13 && !$('#customer-name-field').val()) {
		e.preventDefault()
	}
	if (e.which === 13) {
	e.preventDefault();
	let brandNewCustomer = {id: currentHotel.users.length + 1, name: $('#new-customer-name').val()};
	currentHotel.users.push(brandNewCustomer);
	console.log(currentHotel.users)
	}
}
// function displayCurrentDate() {
// 	let today = new Date();
// 	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// 	return today.toLocaleDateString('en-US', options);
// }


// function defaultMainTab() {
// 	let mainDefault = `
// 	<p>${displayCurrentDate()}</p>
// 	<p><span>Total Unoccupied Rooms : </span>${currentHotel.getUnoccupiedRooms().length}<p>
// 	<p><span>Total Revenue : </span>$${currentHotel.getTotalRevenue()}</p>
// 	<p><span>Percentage of Rooms Occupied : </span> ${currentHotel.getPercentageOccupied()}%`;
// 	$('#main').html(mainDefault)
// }

console.log(today)
setTimeout(() => {
	console.log(currentHotel)
}, 2000)
