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
    let bookings = finalData.find(data => data.hasOwnProperty('bookings')).bookings;
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
$('#roomservice').on('keypress', handleNewOrder);
$('#roomservice').on('click', handleNewOrder);

setTimeout(() => {
  defaultMainTab(currentHotel);
  $('#customer-name-field').attr("disabled", false)
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
  } else if (e.which === 13) {
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
  if (e.which === 13 && e.target.id === "new-date-orders") {
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
    $('#filter-room-type').attr("disabled", false);
    $('#filter-room-type').attr("data-room", e.target.value);
  }
  if ((e.which === 13 || 1 || 2 || 3)  && e.target.id === "filter-room-type") {
    e.preventDefault();
    let roomsAvailable = currentHotel.getUnoccupiedRooms();
    let desiredRoom = e.target.dataset.room;
    let filteredRoomsAvailable = roomsAvailable.filter(room => room.roomType === desiredRoom)
    $('#room-table').remove();
    displayFilteredRooms(filteredRoomsAvailable);
  }
  if ((e.which === 13 || 1 || 2 || 3) && e.target.classList.contains("room-booking")) {
    e.preventDefault();
    let selectedRoomNumber = e.target.dataset.number; 
    let newBookingObject = {userID: currentCustomer.id, date: today, roomNumber: parseInt(selectedRoomNumber)};
    currentRoom.storeUnconfirmedBookings(newBookingObject);
    e.target.disabled = true;
    if (!$('#confirm-new-booking').length) {
      let confirmButton = `<label for="confirm-new-booking">Confirm Booking Now</label><button id="confirm-new-booking" tabindex="0">Confirm New Booking</button>
      <p>or</p><br>`;
      $('#room-right').append(confirmButton);
    }
    if (!$('#menu-button').length) {
      let menuButton = `<label for="menu-button">Add Room Service for This Booking</label><button id="menu-button" tabindex="0">View Room Service Menu</button>`;
      $('#room-right').append(menuButton);
    }
  }
  if ((e.which === 13 || 1 || 2 || 3)  && e.target.id === "menu-button") {
    e.preventDefault();
    let menuItems = [...new Set(currentHotel.roomServices.map(item => {
      return {food: item.food, price: item.totalCost}
    }))];
    displayMenu(menuItems);
  }
  if ((e.which === 13 || 1 || 2 || 3) && e.target.id === "confirm-new-booking") {
    e.preventDefault();
    currentRoom.makeNewBooking(currentHotel);
    defaultMainTab(currentHotel);
    currentOrder.showOrders(currentHotel);
    currentRoom.showPolarDates(currentHotel);
    $('#roomservice').html(currentCustomer.showMyOrders(currentHotel));
    $('#room-left').html(currentCustomer.showMyBookings(currentHotel));
  }
}

function handleNewOrder(e) {
  if ((e.which === 13 || 1 || 2 || 3) && e.target.classList.contains("menu-item-button")) {
    e.preventDefault();
    let newOrder = {food: e.target.dataset.food, price: e.target.dataset.price};
    currentOrder.storeUnconfirmedOrders(currentHotel, currentCustomer, newOrder);
  }
  if ((e.which === 13 || 1 || 2 || 3) && e.target.id === "confirm-menu-purchase" ) {
    e.preventDefault();
    currentOrder.placeNewOrder(currentHotel);
  }
  if ((e.which === 13 || 1 || 2 || 3) && e.target.id === "confirm-new-booking") {
    e.preventDefault();
    currentRoom.makeNewBooking(currentHotel);
    defaultMainTab(currentHotel);
    currentOrder.showOrders(currentHotel);
    currentRoom.showPolarDates(currentHotel);
    $('#roomservice').html(currentCustomer.showMyOrders(currentHotel));
    $('#room-left').html(currentCustomer.showMyBookings(currentHotel));
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
  $('#room-left').html(currentCustomer.showMyBookings(currentHotel));
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
  let roomsAvailable = `We found the following rooms of that type available today :`;
  let roomsUnavailable = `Unfortunately no rooms of that type are available, here is a list of the available rooms :`;
  let availabilityMessage = rooms.length ? roomsAvailable : roomsUnavailable;
  let roomTable = `
  <table id="room-table">
    <thead>
      <tr>
        <th>${availabilityMessage}</th>
      <tr>
    <thead>
    <tbody>`;
  rooms.forEach(room => {
    let bedMessage = room.numBeds > 1 ? ` with ${room.numBeds} ${room.bedSize} beds` : ` with 1 ${room.bedSize} bed`;
    let bidetMessage = room.bidet === true ? `and a bidet.` : `without a bidet.`;
    roomTable += `<tr><td><button class="room-booking" data-number="${room.number}"> Room ${room.number} — a ${room.roomType}, ${bedMessage}, ${bidetMessage}</button></td></tr>`
  });
  roomTable += `
    </tbody>
  </table`;
  $('#room-filter-form').append(roomTable); 
}

function displayMenu(menu) {
  let menuTable = `
  <table id="menu-table">
    <thead>
      <tr>
        <th colspan="3">Click on an item to add it to your customer's order:</th>
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
  <table>
  <label for="confirm-menu-purchase">Add Customer Selections to Order</label>
  <button id="confirm-menu-purchase">Confirm Room Service Order</button><br>
  <label for="confirm-new-booking">Submit Completed Booking</label>
  <button id="confirm-new-booking">Confirm New Booking</button>`;
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
        <input type="radio" id="single-room" value="single room" name="room-type" tabindex="0">
        <label for="single-room">Single Room</label>
        <input type="radio" id="junior-suite" value="junior suite" name="room-type" tabindex="0">
        <label for="junior-suite">Junior Suite</label>
        <input type="radio" id="suite" value="suite" name="room-type" tabindex="0">
        <label for="suite">Suite</label>
        <input type="radio" id="residential-suite" value="residential suite" name="room-type" tabindex="0">
        <label for="residential-suite">Residential Suite</label>
        <button id="filter-room-type" tabindex="0" disabled>Filter Rooms</button>
        </fieldset>
      </form>`;
  $('#room-right').html(filterMenu);
}

function displayAvailableRoomsByDate(date, rooms) {
  let roomsAvailableTable = `
  <table id="rooms-available">
    <thead>
      <tr>
        <th>The following rooms are available on ${date}:</th>
      <tr>
    <thead>
    <tbody>`;
  rooms.forEach(room => 
    roomsAvailableTable += `<tr><td>Room Number ${room.number}</td></tr>`)
  roomsAvailableTable += `</tbody></table>`;
  $('#bookings-search').append(roomsAvailableTable);
}