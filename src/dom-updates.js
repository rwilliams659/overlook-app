const domUpdates = {
  today: null,
  bookingRepo: null,

  //login view
  displayFormError(message) {
    let errorMsg = document.getElementById('error-msg')
    if (message === 'success') {
      errorMsg.innerText = 'Username or password invalid. Please try again.';
    } else {
      errorMsg.innerText = '';
    }
  },

  //manager dash
  populateManagerDash(rooms, revenue, occupancy) {
    const availableRooms = document.getElementById('rooms-today');
    const revenueToday = document.getElementById('revenue-today');
    const roomOccupancy = document.getElementById('room-occupancy');
    availableRooms.innerText = rooms;
    revenueToday.innerText = `$${revenue}`;
    roomOccupancy.innerText = `${occupancy}%`;
  },

  //refactor to combine following 2 methods
  displayNoUserFoundError() {
    const searchBarError = document.getElementById('no-user-error');
    searchBarError.innerText = 'No user found. Please try again.';
    const searchResults = document.querySelector('.search-results-display');
    searchResults.classList.add('hidden');
  },

  displaySearchResultBox() {
    const searchBarError = document.getElementById('no-user-error');
    searchBarError.innerText = '';
    const searchResults = document.querySelector('.search-results-display');
    searchResults.classList.remove('hidden');
  },

  displayUserInformation(user, userTotalSpent, userBookings) {
    const name = document.getElementById('user-name');
    name.innerText = user.name;
    const totalSpent = document.getElementById('total-spent-user');
    totalSpent.innerText = userTotalSpent;
    const bookingsList = document.getElementById('bookings-list');
    const bookingsHTML = this.generateBookingsList(userBookings);
    bookingsList.innerHTML = bookingsHTML;
  },

  generateBookingsList(bookings) {
    const sortedBookings = this.bookingRepo.sortBookingsByDate(bookings);
    return sortedBookings.reduce((bookingsHTML, booking) => {
      if (booking.date < this.today) {
        let newHTML = `<li>${booking.date}: Room ${booking.roomNumber}</li>`
        return bookingsHTML + newHTML;
      } else {
        let newHTML = `<li>${booking.date}: Room ${booking.roomNumber}<button class="delete-btn" id=${booking.id}>Delete reservation</button></li>`
        return bookingsHTML + newHTML;
      }
    }, '')
  },

  displayReservationMessage(subject) {
    const errorMessageBox = document.getElementById('add-res-error');
    if (subject === 'success') {
      errorMessageBox.classList.remove('error');
      errorMessageBox.classList.add('success')
      errorMessageBox.innerText = 'Reservation has been added!';
    } else {
      errorMessageBox.classList.add('error');
      errorMessageBox.classList.remove('success')
      errorMessageBox.innerText = `Please enter a valid ${subject}.`
    }
  },
  
  confirmReservationDeleted(event) {
    const reservation = event.target.parentNode;
    reservation.classList.add('success')
    reservation.innerText = `Reservation has been deleted!`
  },

  populateCustomerDash(customerDashInfo) {
    const userDisplayName = document.getElementById('customer-name');
    const totalSpent = document.getElementById('total-spent-customer');
    const bookingsList = document.getElementById('bookings-list-customer');
    userDisplayName.innerText = customerDashInfo.userName;
    totalSpent.innerText = customerDashInfo.totalUserSpend;
    bookingsList.innerHTML = this.generateBookingsList(customerDashInfo.userBookings);
  },

  generateAvailableRooms(availableRooms) {
    return availableRooms.reduce((roomsHTML, room) => {
      let roomHTML = `
    <section class="search-results-display">
    <p class="room-style">Room ${room.number}</p>
    <ul>
      <li>${room.roomType}</li>
      <li>${room.numBeds} ${room.bedSize} size beds</li>
      <li>Bidet included: ${room.bidet}</li>
      <li>$${room.costPerNight} / night</li>
    </ul>
    <button class="make-reservation" id="${room.number}">Make reservation</button>
  </section>`;
      return roomsHTML + roomHTML;
    }, '');
  },

  displayAvailableRooms(roomsHTML) {
    this.toggleAvailabilityDisplay('display')
    document.getElementById('no-availability-error').innerText = '';
    const roomResults = document.querySelector('.all-room-results');
    roomResults.innerHTML = roomsHTML;
  },

  displayAvailabilityMessage(subject) {
    this.toggleAvailabilityDisplay('hide')
    let errorMsg = document.getElementById('no-availability-error');
    if (subject === 'no rooms') {
      errorMsg.classList.remove('success');
      errorMsg.innerText = 'Sorry, there are no rooms available on that date. Please adjust your search.';
    } else {
      errorMsg.classList.add('success');
      errorMsg.innerText = 'Your room has been booked!'
    }
  },

  toggleAvailabilityDisplay(command) {
    const roomResults = document.querySelector('.all-room-results');
    const roomTypeFilter = document.querySelector('.filter');
    if (command === 'display') {
      roomResults.classList.remove('hidden');
      roomTypeFilter.classList.remove('hidden');
    } else {
      roomResults.classList.add('hidden');
      roomTypeFilter.classList.add('hidden');
    }
  }
}

module.exports = domUpdates; 


// if (typeof module !== "undefined") {
//   module.exports = domUpdates;
// }