/* eslint-disable max-len */
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/reservation.png'
// import domUpdates from './domUpdates';
import UserRepo from './UserRepo';
import RoomRepo from './RoomRepo';
import BookingRepo from './BookingRepo';
const Moment = require('moment');

let userRepo, roomRepo, bookingRepo, today, currentUserId;

const loginSubmitBtn = document.getElementById('login-submit');
const logOutBtn = document.getElementById('log-out-btn');
const loginView = document.querySelector('.login-view');
const managerView = document.querySelector('.manager-view');
const customerView = document.querySelector('.customer-view');

window.onload = fetchData; 

loginSubmitBtn.addEventListener('click', validateForm);
logOutBtn.addEventListener('click', logOut);
managerView.addEventListener('click', analyzeManagerClick)
customerView.addEventListener('click', analyzeCustomerClick)

function fetchData() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users'),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms'),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([users, rooms, bookings]) => getInfoForPageLoad(users, rooms, bookings))
    .catch(error => console.log(error.message))
}

function getInfoForPageLoad(users, rooms, bookings) {
  instantiateData(users, rooms, bookings);
  today = generateCurrentDate(); 
}

function instantiateData(users, rooms, bookings) {
  userRepo = new UserRepo(users.users);
  roomRepo = new RoomRepo(rooms.rooms);
  bookingRepo = new BookingRepo(bookings.bookings);
}

function generateCurrentDate() {
  const rawDate = new Date();
  let day = rawDate.getDate();
  if (day < 10) {
    day = `0${day.toString()}`
  }
  let month = rawDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month.toString()}`
  }
  const year = rawDate.getFullYear();
  return `${year}/${month}/${day}`
}

function analyzeManagerClick(event) {
  event.preventDefault(); 
  if (event.target.classList.contains('search-submit')) {
    findMatchingUser();
  }
  if (event.target.classList.contains('delete-btn')) {
    deleteData(event);
  }
  if (event.target.id === 'reservation-submit') {
    testDataToPost(); 
  }
}

function analyzeCustomerClick(event) {
  let availableRooms = getRoomsAvailableOnDate();
  if (event.target.id === 'reservation-search') {
    getAndDisplayAvailableRooms(availableRooms)
  }
  if (event.target.id === 'filter-search') {
    const roomType = getRoomsBasedOnFilter(event); 
    const roomsInType = roomRepo.getRoomsByType(availableRooms, roomType); 
    getAndDisplayAvailableRooms(roomsInType);
  }
  if (event.target.classList.contains('make-reservation')) {
    getRoomAndDate(event)
  }
}

function getRoomAndDate(event) {
  let roomNumber = event.target.id;
  let dateSelected = getDateSelected();
  addNewReservation(dateSelected, roomNumber);
}

function getAndDisplayAvailableRooms(availableRooms) {
  if (availableRooms.length === 0) {
    displayAvailabilityError()
  } else {
    const roomsHTML = generateAvailableRooms(availableRooms);
    displayAvailableRooms(roomsHTML);
  }
}

function getRoomsBasedOnFilter(event) {
  event.preventDefault();
  return document.getElementById('room-type').value
}

function validateForm(event) {
  event.preventDefault();
  const userNameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  const regex = /^customer([1-9]|[1-4]\d|50)$/;
  if (passwordValue === 'overlook2020' && userNameValue === 'manager') {
    toggleView(managerView, loginView, customerView); 
    populateManagerDash();
  } else if (passwordValue === 'overlook2020' && regex.test(userNameValue)) {
    setUpCustomerDash(userNameValue);
  } else {
    displayFormError(); 
  }
  document.querySelector('.login-form').reset();
}

function setUpCustomerDash(userNameValue) {
  setCurrentUserID(userNameValue)
  toggleView(customerView, loginView, managerView);
  const customerDashInfo = getInfoForCustomerDash();
  populateCustomerDash(customerDashInfo); 
}

function logOut() {
  toggleView(loginView, customerView, managerView)
}

function toggleView(viewToDisplay, viewToHide, viewToHide2) {
  viewToDisplay.classList.remove('hidden'); 
  viewToHide.classList.add('hidden');
  viewToHide2.classList.add('hidden');
}

function setCurrentUserID(userNameValue) {
  currentUserId = parseInt(userNameValue.split('r')[1]);
}

function displayFormError() {
  let errorMsg = document.getElementById('error-msg');
  errorMsg.innerText = 'Username or password invalid. Please try again.';
}

//Manager dash left side

function getRoomNumbersOnDate(date) {
  const todaysBookings = bookingRepo.getBookingsOnDate(date);
  return bookingRepo.mapBookingsToRoomNumber(todaysBookings);
}

function getNumberAvailableRooms() {
  const unavailableRoomNumbers = getRoomNumbersOnDate(today);
  return roomRepo.getAvailableRooms(unavailableRoomNumbers); 
}

function getTodaysRevenue() {
  const unavailableRoomNumbers = getRoomNumbersOnDate(today);
  const unavailableRooms = roomRepo.getUnavailableRooms(unavailableRoomNumbers);
  return roomRepo.calculateTotalCost(unavailableRooms);
}

function getTodaysOccupancy() {
  const todaysBookings = bookingRepo.getBookingsOnDate(today);
  return roomRepo.getRoomOccupancy(todaysBookings);
}

function populateManagerDash() {
  const availableRooms = document.getElementById('rooms-today');
  const revenueToday = document.getElementById('revenue-today');
  const roomOccupancy = document.getElementById('room-occupancy');
  availableRooms.innerText = getNumberAvailableRooms().length; 
  revenueToday.innerText = `$${getTodaysRevenue()}`; 
  roomOccupancy.innerText = `${getTodaysOccupancy()}%`;
}

//Manager dash right side 

function findMatchingUser() {
  const searchTerm = document.getElementById('manager-search-bar').value;
  const userToDisplay = userRepo.findUser(searchTerm); 
  if (userToDisplay === undefined) {
    displayNoUserFoundError();
  } else {
    createAndDisplayUserInfo(userToDisplay)
  }
}

function displayNoUserFoundError() {
  const searchBarError = document.getElementById('no-user-error');
  searchBarError.innerText = 'No user found. Please try again.';
  const searchResults = document.querySelector('.search-results-display');
  searchResults.classList.add('hidden');
}

function createAndDisplayUserInfo(userToDisplay) {
  currentUserId = userToDisplay.id;
  displaySearchResultBox();
  const infoToDisplay = generateInfoToDisplay(userToDisplay);
  displayUserInformation(infoToDisplay.user, infoToDisplay.userTotalSpent, infoToDisplay.userBookings)
}

function displaySearchResultBox() {
  const searchBarError = document.getElementById('no-user-error');
  searchBarError.innerText = '';
  const searchResults = document.querySelector('.search-results-display');
  searchResults.classList.remove('hidden');
}

function generateInfoToDisplay(user) {
  const userBookings = bookingRepo.getUserBookings(user.id);
  const userTotalSpent = calculateTotalUserSpend(userBookings);
  return {user: user, userTotalSpent: userTotalSpent, userBookings: userBookings};
}

function displayUserInformation(user, userTotalSpent, userBookings) {
  const name = document.getElementById('user-name');
  name.innerText = user.name;
  const totalSpent = document.getElementById('total-spent-user');
  totalSpent.innerText = userTotalSpent;
  const bookingsList = document.getElementById('bookings-list');
  const bookingsHTML = generateBookingsList(userBookings);
  bookingsList.innerHTML = bookingsHTML; 
}

function calculateTotalUserSpend(userBookings) {
  const roomsBooked = roomRepo.getRoomsFromBookings(userBookings);
  return roomRepo.calculateTotalCost(roomsBooked);
}

function generateBookingsList(bookings) {
  const sortedBookings = bookingRepo.sortBookingsByDate(bookings);
  today = "2020/02/06";
  return sortedBookings.reduce((bookingsHTML, booking) => {
    if (booking.date < today) {
      let newHTML = `<li>${booking.date}: Room ${booking.roomNumber}</li>`
      return bookingsHTML + newHTML;
    } else {
      let newHTML = `<li>${booking.date}: Room ${booking.roomNumber}<button class="delete-btn" id=${booking.id}>Delete reservation</button></li>`
      return bookingsHTML + newHTML;
    }
  }, '')
}

function deleteData(event) {
  const bookingId = parseInt(event.target.id);
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        "id": bookingId
      }
    ),
  })
    .then(response => {
      console.log(response.status);
      getUpdatedBookingData();
    })
    .catch(err => console.error(err))
}

function testDataToPost() {
  let date = document.getElementById('date').value
  date = date.replace(/-/g, "/")
  const roomNumber = document.getElementById('room-num').value;
  if (date < today) {
    displayReservationMessage('date');
  } else if (roomNumber > roomRepo.rooms.length) {
    displayReservationMessage('room number');
  } else {
    addNewReservation(date, roomNumber);
    displayReservationMessage('success')
  }
}

function displayReservationMessage(subject) {
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
}

function addNewReservation(date, roomNumber) {
  const postBody = createPostBody(date, roomNumber);
  postData(postBody);
}

function createPostBody(date, roomNumber) {
  roomNumber = parseInt(roomNumber)
  return {
    "userID": currentUserId,
    "date": date,
    "roomNumber": roomNumber
  }
}

function postData(postBody) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  })
    .then(response => { 
      console.log(response.status);
      getUpdatedBookingData();
    })
    .catch(err => console.error(err))
}

function getUpdatedBookingData() {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .then(bookings => updateBookings(bookings))
    .catch(err => console.error(err))
}

function updateBookings(bookings) {
  bookingRepo = new BookingRepo(bookings.bookings);
}

//customer dash

function getInfoForCustomerDash() {
  const currentUser = userRepo.getUserFromId(currentUserId);
  const customerInfo = generateInfoToDisplay(currentUser);
  return {userName: currentUser.name, userBookings: customerInfo.userBookings, totalUserSpend: customerInfo.userTotalSpent}
}

function populateCustomerDash(customerDashInfo) {
  const userDisplayName = document.getElementById('customer-name');
  const totalSpent = document.getElementById('total-spent-customer');
  const bookingsList = document.getElementById('bookings-list-customer');
  userDisplayName.innerText = customerDashInfo.userName;
  totalSpent.innerText = customerDashInfo.totalUserSpend; 
  bookingsList.innerHTML = generateBookingsList(customerDashInfo.userBookings); 
}

function getRoomsAvailableOnDate() {
  event.preventDefault();
  let dateSelected = getDateSelected(); 
  const roomsBooked = getRoomNumbersOnDate(dateSelected); 
  return roomRepo.getAvailableRooms(roomsBooked);
}

function getDateSelected() {
  let dateSelected = document.getElementById('customer-search').value;
  return dateSelected.replace(/-/g, "/");
}

function generateAvailableRooms(availableRooms) {
  return availableRooms.reduce((roomsHTML, room) => {
    let roomHTML = `
    <section class="search-results-display">
    <p class="room-style">Room ${room.number}</p>
    <ul>
      <li>${room.roomType}</li>
      <li>${room.numBeds} ${room.bedSize} size beds</li>
      <li>Bidet included: ${room.bidet}</li>
      <li>$${room.costPerNight}/night</li>
    </ul>
    <button class="make-reservation" id="${room.number}">Make reservation</button>
  </section>`;
    return roomsHTML + roomHTML;
  }, '');
}

function displayAvailableRooms(roomsHTML) {
  toggleAvailabilityDisplay('display')
  document.getElementById('no-availability-error').innerText = '';
  const roomResults = document.querySelector('.all-room-results');
  roomResults.innerHTML = roomsHTML;
}

function displayAvailabilityError() {
  toggleAvailabilityDisplay('hide')
  let errorMsg = document.getElementById('no-availability-error');
  errorMsg.innerText = 'Sorry, there are no rooms available on that date. Please adjust your search.';
}

function toggleAvailabilityDisplay(command) {
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
