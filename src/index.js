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
  console.log(today); 
}

function instantiateData(users, rooms, bookings) {
  userRepo = new UserRepo(users.users);
  roomRepo = new RoomRepo(rooms.rooms);
  bookingRepo = new BookingRepo(bookings.bookings);
  console.log('UserRepo', userRepo);
  console.log('RoomRepo', roomRepo);
  console.log('bookingRepo', bookingRepo)
}

function validateForm(event) {
  event.preventDefault();
  const userNameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  const regex = /^customer([1-9]|[1-4]\d|50)$/;
  if (passwordValue === 'overlook2020' && userNameValue === 'manager') {
    toggleView(managerView, loginView, customerView); 
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
  errorMsg.innerHTML = '<p style="color:red">Username or password invalid. Please try again.</p>';
}

/*-Create function for calculating "today"
-Then user "today" to populate:

Total Rooms Available for today’s date
Total revenue for today’s date
Percentage of rooms occupied for today’s date */

function generateCurrentDate() {
  const rawDate = new Date();
  let day = rawDate.getDate();
  if (day < 10) {
    day = `0${day.toString()}`
  };
  let month = rawDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month.toString()}`
  };
  const year = rawDate.getFullYear();
  return `${year}/${month}/${day}`
}