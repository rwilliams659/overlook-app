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

let userRepo, roomRepo, bookingRepo, today, currentUser;

const loginSubmitBtn = document.getElementById('login-submit');
const logOutBtn = document.getElementById('log-out-btn');
const loginView = document.querySelector('.login-view');
const managerView = document.querySelector('.manager-view');
const customerView = document.querySelector('.customer-view');

window.onload = fetchData; 

loginSubmitBtn.addEventListener('click', validateForm);
logOutBtn.addEventListener('click', logOut);
managerView.addEventListener('click', analyzeManagerClick)

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
    toggleView(customerView, loginView, managerView); 
  } else {
    displayFormError(); 
  }
  document.querySelector('.login-form').reset();
}

function logOut() {
  toggleView(loginView, customerView, managerView)
}

function toggleView(viewToDisplay, viewToHide, viewToHide2) {
  viewToDisplay.classList.remove('hidden');
  viewToHide.classList.add('hidden');
  viewToHide2.classList.add('hidden');
}

function displayFormError() {
  let errorMsg = document.getElementById('error-msg');
  errorMsg.innerText = 'Username or password invalid. Please try again.';
}

//Manager dash left side

function getRoomNumbersOnDate() {
  const todaysBookings = bookingRepo.getBookingsOnDate(today);
  return bookingRepo.mapBookingsToRoomNumber(todaysBookings);
}

function getNumberAvailableRooms() {
  const unavailableRoomNumbers = getRoomNumbersOnDate();
  return roomRepo.getAvailableRooms(unavailableRoomNumbers); 
}

function getTodaysRevenue() {
  const unavailableRoomNumbers = getRoomNumbersOnDate();
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

/* 
Username search:
-If no name matches, display error message //WRITTEN
-If name matches, load user information box //WRITTEN 

User information to be added to above box:
-Name //WRITTEN
-Total amount spent on rooms //WRITTEN  
-List of bookings (from most recent to oldest)
-For each booking from today & in future, add a 'Delete reservation' button
-Add reservation form should auto-populate with user name as well 
*/

function findMatchingUser() {
  const searchTerm = document.getElementById('search-bar').value;
  const userToDisplay = userRepo.findUser(searchTerm); 
  const searchBarError = document.getElementById('no-user-error');
  if (userToDisplay === undefined) {
    displayNoUserFoundError(searchBarError);
  } 
}

function displayNoUserFoundError(searchBarError) {
  searchBarError.innerText = 'No user found. Please try again.';
  const searchResults = document.querySelector('.search-results-display');
  searchResults.classList.add('hidden');
}