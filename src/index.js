import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import Hotel from './Hotel';

let today = getCurrentDate();
let usersAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
let roomsAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms');
let bookingsAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings');
let roomServicesAPICall = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices'); 
let myHotel = null; 

Promise.all([usersAPICall, roomsAPICall, bookingsAPICall, roomServicesAPICall])
  .then(values => Promise.all(values.map(value => value.json())))
  .then(finalData => {
  	let users = finalData.find(data => data.hasOwnProperty('users'));
  	let rooms = finalData.find(data => data.hasOwnProperty('rooms'))
  	let bookings = finalData.find(data => data.hasOwnProperty('bookings'));
  	let roomServices = finalData.find(data => data.hasOwnProperty('roomServices'));
  	myHotel = new Hotel(users, rooms, bookings, roomServices, today);
	});

$('.tab-content').hide();
$('#main').show();
$('#main-tab, #customer-tab, #room-tab, #roomservice-tab').on('click', showTabContent);


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

console.log(today)
setTimeout(() => {
	console.log(myHotel)
}, 2000)
