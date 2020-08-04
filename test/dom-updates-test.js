const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/dom-updates';

chai.use(spies);

describe('domUpdates', function() {
  beforeEach(function() {
    domUpdates.today = "2019/06/15";
    
    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector'], () => {
      return {
        innerText: '',
        innerHTML: () => { },
      }
    }); 
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

  it('should spy on populateCustomerDash', function() {
    const customerDashInfo = {userName: '', totalUserSpend: 0, userBookings: []};
    
    domUpdates.generateBookingsList = () => {};
    domUpdates.populateCustomerDash(customerDashInfo);

    expect(document.getElementById).to.have.been.called(3);
    expect(document.getElementById).to.have.been.called.with('customer-name');
    expect(document.getElementById).to.have.been.called.with('total-spent-customer');
    expect(document.getElementById).to.have.been.called.with('bookings-list-customer');
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
}) 