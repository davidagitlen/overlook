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
	}

}

export default domUpdates;