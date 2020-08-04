/* eslint-disable max-len */
import './css/base.scss';
import './images/reservation.png'
import './images/hotel.jpg'
import domUpdates from './dom-updates';
import UserRepo from './UserRepo';
import RoomRepo from './RoomRepo';
import BookingRepo from './BookingRepo';

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
  domUpdates.today = today; 
  domUpdates.setDateDefaults()
}

function instantiateData(users, rooms, bookings) {
  userRepo = new UserRepo(users.users);
  roomRepo = new RoomRepo(rooms.rooms);
  bookingRepo = new BookingRepo(bookings.bookings);
  domUpdates.bookingRepo = bookingRepo; 
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
  if (event.target.id === 'search-by-user') {
    event.preventDefault(); 
    findMatchingUser();
  }
  if (event.target.classList.contains('delete-btn')) {
    event.preventDefault(); 
    handleDeleteRequest(event);
  }
  if (event.target.id === 'reservation-submit') {
    event.preventDefault(); 
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
  if (event.target.classList.contains('delete-btn')) {
    handleDeleteRequest(event)
  }
}

function handleDeleteRequest(event) {
  confirm('Are you sure you want to delete this reservation?');
  deleteData(event);
  domUpdates.confirmReservationDeleted(event); 
}

function getRoomAndDate(event) {
  let roomNumber = event.target.id;
  let dateSelected = getDateSelected();
  addNewReservation(dateSelected, roomNumber);
  domUpdates.displayAvailabilityMessage('success');
}

function getAndDisplayAvailableRooms(availableRooms) {
  if (availableRooms.length === 0) {
    domUpdates.displayAvailabilityMessage('no rooms')
  } else {
    const roomsHTML = domUpdates.generateAvailableRooms(availableRooms);
    domUpdates.displayAvailableRooms(roomsHTML);
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
    getInfoForManagerDash()
  } else if (passwordValue === 'overlook2020' && regex.test(userNameValue)) {
    setUpCustomerDash(userNameValue);
  } else {
    domUpdates.displayFormError('success'); 
  }
  document.querySelector('.login-form').reset();
}

function setUpCustomerDash(userNameValue) {
  setCurrentUserID(userNameValue)
  domUpdates.toggleView(customerView, loginView, managerView);
  const customerDashInfo = getInfoForCustomerDash();
  domUpdates.populateCustomerDash(customerDashInfo); 
}

function logOut() {
  domUpdates.toggleView(loginView, customerView, managerView);
  domUpdates.displayFormError('reset')
}

function setCurrentUserID(userNameValue) {
  currentUserId = parseInt(userNameValue.split('r')[1]);
}

//Manager dash

function getRoomNumbersOnDate(date) {
  const todaysBookings = bookingRepo.getBookingsOnDate(date);
  return bookingRepo.mapBookingsToRoomNumber(todaysBookings);
}

function getNumberAvailableRooms() {
  const unavailableRoomNumbers = getRoomNumbersOnDate(today);
  return roomRepo.getAvailableRooms(unavailableRoomNumbers); 
}

function getTodaysRevenue() {
  const todaysBookings = bookingRepo.getBookingsOnDate(today);
  const roomsBooked = roomRepo.getRoomsFromBookings(todaysBookings);
  const totalCost = roomRepo.calculateTotalCost(roomsBooked);
  return formatNumber(totalCost);
}

function formatNumber(cost) {
  return cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function getTodaysOccupancy() {
  const todaysBookings = bookingRepo.getBookingsOnDate(today);
  return roomRepo.getRoomOccupancy(todaysBookings);
}

function getInfoForManagerDash() {
  domUpdates.toggleView(managerView, loginView, customerView); 
  const rooms = getNumberAvailableRooms().length;
  const revenue = getTodaysRevenue()
  const occupancy = getTodaysOccupancy(); 
  domUpdates.populateManagerDash(rooms, revenue, occupancy)
}

function findMatchingUser() {
  const searchTerm = document.getElementById('manager-search-bar').value;
  const userToDisplay = userRepo.findUser(searchTerm); 
  if (userToDisplay === undefined) {
    domUpdates.toggleNoUserFoundError('no user');
  } else {
    createUserInfo(userToDisplay)
  }
}

function createUserInfo(userToDisplay) {
  currentUserId = userToDisplay.id;
  domUpdates.toggleNoUserFoundError('reset');
  const infoToDisplay = generateInfoToDisplay(userToDisplay);
  domUpdates.displayUserInformation(infoToDisplay.user, infoToDisplay.userTotalSpent, infoToDisplay.userBookings)
}

function generateInfoToDisplay(user) {
  const userBookings = bookingRepo.getUserBookings(user.id);
  let userTotalSpent = calculateTotalUserSpend(userBookings);
  userTotalSpent = formatNumber(userTotalSpent);
  return {user, userTotalSpent, userBookings};
}

function calculateTotalUserSpend(userBookings) {
  const roomsBooked = roomRepo.getRoomsFromBookings(userBookings);
  return roomRepo.calculateTotalCost(roomsBooked);
}

function deleteData(event) {
  let bookingId = event.target.id;
  if (/^\d+$/.test(bookingId)) {
    bookingId = parseInt(bookingId)
  }
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
  const roomNumber = parseInt(document.getElementById('room-num').value);
  if (bookingRepo.getBookingForRoomOnDate(roomNumber, date)) {
    domUpdates.displayReservationMessage('reservation exists')
  } else {
    validateReservationDate(date, roomNumber);
  }
}

function validateReservationDate(date, roomNumber) {
  if (date < today) {
    domUpdates.displayReservationMessage('date');
  } else if (roomNumber === '' || roomNumber > roomRepo.rooms.length || roomNumber < 1) {
    domUpdates.displayReservationMessage('room number');
  } else {
    addNewReservation(date, roomNumber);
    domUpdates.displayReservationMessage('success')
  }
}

function addNewReservation(date, roomNumber) {
  const postBody = createPostBody(date, roomNumber);
  postData(postBody);
}

function createPostBody(reservationDate, room) {
  room = parseInt(room)
  return {
    "userID": currentUserId,
    "date": reservationDate,
    "roomNumber": room
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
