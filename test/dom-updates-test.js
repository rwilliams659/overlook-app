const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/dom-updates';

chai.use(spies);

describe.only('domUpdates', function() {
  beforeEach(function() {
    domUpdates.today = "2019/06/15";
    
    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector'], () => {
      return {
        innerText: '',
        innerHTML: () => { }
        // insertAdjacentHTML: () => { },
        // forEach: () => { }
      }
    }); 

    // chai.spy.on(document, ['body'], () => {
    //   return {
    //     classList: () => { 
    //       // add: { };
    //       // remove:  { }
    //     },
    //   }
    // })

  //DOES NOT RECOGNIZE element
  // it('should spy on toggleView', function() {
  //   domUpdates.toggleView();

  //   expect(element.classList.remove).to.have.been.called(1);
  //   expect(element.classList.remove).to.have.been.called.with('hidden');
  //   expect(element.classList.add).to.have.been.called(2);
  //   expect(element.classList.add).to.have.been.called.with('hidden');
  })

  it('should spy on setDateDefaults', function() {
    domUpdates.setDateDefaults();

    expect(document.getElementById).to.have.been.called(2);
    expect(document.getElementById).to.have.been.called.with('customer-search');
    expect(document.getElementById).to.have.been.called.with('date');
  });

  it('should spy on displayFormError', function() {
    domUpdates.displayFormError(); 

    expect(document.getElementById).to.have.been.called(1);
    expect(document.getElementById).to.have.been.called.with('error-msg');
  });

  it('should spy on populateManagerDash', function() {
    const rooms = [];
    const revenue = 0;
    const occupancy = 0; 

    domUpdates.populateManagerDash(rooms, revenue, occupancy); 

    expect(document.getElementById).to.have.been.called(3);
    expect(document.getElementById).to.have.been.called.with('rooms-today');
    expect(document.getElementById).to.have.been.called.with('revenue-today');
    expect(document.getElementById).to.have.been.called.with('room-occupancy');
  });

  // LAST 2 LINES DON'T PASS; CAN'T TEST CLASSLIST
  it('should spy on toggleNoUserFoundError', function() {
    const message = '';
    
    domUpdates.toggleNoUserFoundError(message);

    expect(document.getElementById).to.have.been.called(1);
    expect(document.getElementById).to.have.been.called.with('no-user-error');

    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('.search-results-display');

    expect(document.body.classList).to.have.been.called(2);
    expect(document.body.classList).to.have.been.called.with('hidden')
  });

  it('should spy on displayUserInformation', function() {
    const user = {};
    const userTotalSpent = 0;
    const userBookings = [];
    domUpdates.generateBookingsList = () => {};

    domUpdates.displayUserInformation(user, userTotalSpent, userBookings);

    expect(document.getElementById).to.have.been.called(3);
    expect(document.getElementById).to.have.been.called.with('user-name');
    expect(document.getElementById).to.have.been.called.with('total-spent-user');
    expect(document.getElementById).to.have.been.called.with('bookings-list');
  });

  //generateBookingsList doesn't have anything to test

  it('should spy on displayReservationMessage', function() {
    const subject = '';

    domUpdates.displayReservationMessage(subject)

    expect(document.getElementById).to.have.been.called(1);
    expect(document.getElementById).to.have.been.called.with('add-res-error');
    //NEED TO FIGURE OUT CLASSLIST, CALLED 4TIMES
  });

  it('should spy on confirmReservationDeleted', function() {
    const event = {};

    domUpdates.confirmReservationDeleted(event);

    //NEED TO FIGURE OUT CLASSLIST, CALLED ONCE
  });

  it('should spy on populateCustomerDash', function() {
    const customerDashInfo = {userName: '', totalUserSpend: 0, userBookings: []};
    domUpdates.generateBookingsList = () => {};

    domUpdates.populateCustomerDash(customerDashInfo);

    expect(document.getElementById).to.have.been.called(3);
    expect(document.getElementById).to.have.been.called.with('customer-name');
    expect(document.getElementById).to.have.been.called.with('total-spent-customer');
    expect(document.getElementById).to.have.been.called.with('bookings-list-customer');
  });

  //generateAvailableRooms doesn't have anything to test

  //this is last function; testing here to avoid redefining function before it's tested
  it('should spy on toggleAvailabilityDisplay', function () {
    const command = '';

    domUpdates.toggleAvailabilityDisplay(command);

    expect(document.querySelector).to.have.been.called(2);
    expect(document.querySelector).to.have.been.called.with('.all-room-results');
    expect(document.querySelector).to.have.been.called.with('.filter');

    //NEED TO TEST CLASSLIST 4X
  });

  it('should spy on displayAvailableRooms', function() {
    const roomsHTML = '';

    domUpdates.toggleAvailabilityDisplay = () => {};

    domUpdates.displayAvailableRooms(roomsHTML);

    expect(document.getElementById).to.have.been.called(1);
    expect(document.getElementById).to.have.been.called.with('no-availability-error');

    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('.all-room-results');
  });

  it('should spy on displayAvailabilityMessage', function() {
    const subject = '';

    domUpdates.displayAvailabilityMessage(subject);

    expect(document.getElementById).to.have.been.called(1);
    expect(document.getElementById).to.have.been.called.with('no-availability-error');

  //NEED TO TEST CLASSLIST TWICE
  });

}) 