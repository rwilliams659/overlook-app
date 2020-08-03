const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/dom-updates';

chai.use(spies);

describe.only('domUpdates', function() {
  beforeEach(function() {
    //define user/room/booking object needed for tests here 
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

  //LAST 2 LINES DON'T PASS; CAN'T TEST CLASSLIST
  // it('should spy on toggleNoUserFoundError', function() {
  //   const message = '';
    
  //   domUpdates.toggleNoUserFoundError(message);

  //   expect(document.getElementById).to.have.been.called(1);
  //   expect(document.getElementById).to.have.been.called.with('no-user-error');

  //   expect(document.querySelector).to.have.been.called(1);
  //   expect(document.querySelector).to.have.been.called.with('.search-results-display');

  //   expect(document.body.classList).to.have.been.called(2);
  //   expect(document.body.classList).to.have.been.called.with('hidden')
  // });

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
}) 