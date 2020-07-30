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

let userRepo, roomRepo, bookingRepo, currentUser, today;

const loginSubmitBtn = document.getElementById('login-submit');

loginSubmitBtn.addEventListener('click', validateForm)

window.onload = fetchData; 

function fetchData() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users'),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms'),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([users, rooms, bookings]) => instantiateData(users, rooms, bookings))
    .catch(error => console.log(error.message))
}

function instantiateData(users, rooms, bookings) {
  userRepo = new UserRepo(users.users);
  roomRepo = new RoomRepo(rooms.rooms);
  bookingRepo = new BookingRepo(bookings.bookings);
}

function validateForm(event) {
  event.preventDefault();
  const userNameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  const regex = /^customer([1-9]|[1-4]\d|50)$/;
  if (passwordValue === 'overlook2020' && userNameValue === 'manager') {
    displayManagerDash(); 
  } else if (passwordValue === 'overlook2020' && regex.test(userNameValue)) {
    displayCustomerDash(); 
  } else {
    displayFormError(); 
  }
}

function displayManagerDash() {
  console.log('Login will get hidden & manager dash will display!')
}

function displayCustomerDash() {
  console.log('Login will get hidden & customer dash will display')
}

function displayFormError() {
  let errorMsg = document.getElementById('error-msg');
  errorMsg.innerHTML = '<p style="color:red">Username or password invalid. Please try again.</p>';
}
