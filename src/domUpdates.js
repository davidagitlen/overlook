import $ from 'jquery';

let domUpdates = {

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
    <form id="enter-new-user" autocomplete="off">
      <fieldset>
        <legend>New Customer Entry</legend>
        <label for="new-customer-name">New Customer Name</label>
        <input type="text" id="new-customer-name" placeholder="Enter New Customer Name" autocomplete="off">
      </fieldset>
    </form>`;
    return message;
  },

  defaultOrders(orders, date) {
    let ordersDefault = ``;
    orders.forEach(order => ordersDefault += `<p>On ${date} ${order.user} ordered one ${order.item} for $${order.price.toFixed(2)}</p>`);
    ordersDefault += `
    <form id="search-orders-by-date" autocomplete="off">
      <fieldset>
        <legend>Find Another Date's Orders</legend>
        <label for="new-date-orders">Search Orders on a Specific Date</label>
        <input type="text" id="new-date-orders" placeholder="yyyy/mm/dd" autocomplete="off">
      </fieldset>
    </form>`;
    $('#roomservice').append(ordersDefault);
  },

  defaultNoOrders(date) {
    let noOrdersMessage = `<p id="no-orders-by-date">No orders placed for ${date}!</p>`;
    noOrdersMessage += `
    <form autocomplete="off">
      <fieldset>
        <legend>Find Another Date's Orders</legend>
        <label for="new-date-orders">Search Orders on a Specific Date</label>
        <input type="text" id="new-date-orders" placeholder="yyyy/mm/dd" autocomplete="off">
      </fieldset>
    </form>`;
    $('#roomservice').append(noOrdersMessage);
  },

  displayCustomerOrders(user, hotel, userOrders) {
    let ordersTable = `
    <table id="user-orders">
      <thead>
        <tr>
          <th colspan="3">Here are all of ${user.name}'s orders:</th>
        <tr>
      <thead>
      <tbody>`
    userOrders.forEach(order => 
      ordersTable += `<tr><td>${order.date}</td><td>${order.food}</td><td>$${order.totalCost.toFixed(2)}</td></tr>`);
    ordersTable += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">${user.name} has spent $${user.findMyOrdersTotal(hotel)} on room service over the course of their stays at your hotel.<td>
        </tr>
      </tfoot>
    <table>`
    return ordersTable;
  },

  noCustomerOrdersFound() {
    let noCustomerOrdersMessage = `
    <p> We didn't find any orders placed for that customer. </p>`
    return noCustomerOrdersMessage;
  },

  defaultRoomTab(best, worst) {
    let bookingsMessage = `
    <p id="popular=date">The most popular recent date at your hotel was ${best.date}, with ${best.bookings} bookings.</p><br>
    <p id="unpopular-date"> The least popular recent date at your hotel was ${worst.date}, with ${worst.bookings} bookings.</p>
    <form id="bookings-search" autocomplte="off">
      <fieldset>
        <legend>Find Another Date's Bookings</legend>
        <label for="new-date-bookings">Search Bookings on a Specific Date</label>
        <input type="text" id="new-date-bookings" placeholder="yyyy/mm/dd" autocomplete="off">
      </fieldset>
    </form>`
    $('#room-left').append(bookingsMessage);
  },

  displayCustomerBookings(user, hotel, userBookings) {
    let sortedBookings = userBookings.sort((a, b) => parseInt(a.date.slice(-5, -3) + a.date.slice(-2)) - parseInt(b.date.slice(-5, -3) + b.date.slice(-2)));
    let bookingsTable = `
    <table id="user-bookings">
      <thead>
        <tr>
          <th colspan="2">Here are all of ${user.name}'s bookings:</th>
        <tr>
      <thead>
      <tbody>
        <tr>
          <td>Date :</td><td>Room Number :</td>
        </tr>`
    sortedBookings.forEach(booking => 
      bookingsTable += `<tr><td>${booking.date}</td><td>${booking.roomNumber}</td>`);
    bookingsTable += `
      </tbody>
    <table>`
    if (!sortedBookings.find(booking => booking.date === hotel.currentDate)) {
      bookingsTable += '<button id="booking-button">Make New Booking</button>';
    }
    return bookingsTable;
  },

  noCustomerBookingsFound() {
    let noCustomerBookingsMessage = `
    <p id="no-customer-bookings-line"> We didn't find any bookings for that customer. </p>
    <button id="booking-button">Make New Booking</button>`;
    return noCustomerBookingsMessage;
  }

}

export default domUpdates;