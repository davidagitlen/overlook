import $ from 'jquery';

let domUpdates = {

	displayCurrentDate() {
	let today = new Date();
	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return today.toLocaleDateString('en-US', options);
	},

	defaultMainTab(hotel) {
		let mainDefault = `
		<p id="current-date">${this.displayCurrentDate()}</p>
		<p id="unoccupied-rooms"><span>Total Unoccupied Rooms : </span>${hotel.getUnoccupiedRooms().length}<p>
		<p id="total-revenue"><span>Total Revenue : </span>$${hotel.getTotalRevenue()}</p>
		<p id="occupied-perc"><span>Percentage of Rooms Occupied : </span> ${hotel.getPercentageOccupied()}%`;
		$('#main').html(mainDefault)
	}, 

	displayUsers(users) {
		let usersList = `<p>Please select one of the following customers:</p>`;
		users.forEach(user => 
			usersList += `<button class="user-list" data-user="${user.name}">${user.name}</button><br>`);
		return usersList;
	},

	noUserFound() {
		let message = `
		<p> We didn't find a current customer with that name.</p>
		<p> Please use the form below to enter them into the system</p>
		<form>
			<fieldset>
				<legend>New Customer Entry</legend>
				<label for="new-customer-name">New Customer Name</label>
				<input type="text" id="new-customer-name" placeholder="Enter New Customer Name">
			</fieldset>
		</form>`;
		return message;
	}

}

export default domUpdates;