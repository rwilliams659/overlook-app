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
        // insertAdjacentHTML: () => { },
        // forEach: () => { }
      }
    });

    // global.element = {};
    // chai.spy.on(element, ['classList.add', 'classList.remove'], () => {
    //   return {
    //     add: '',
    //     remove: '', 
    //     insertAdjacentHTML: () => { },
    //   }
    // });
  });

  //DOES NOT RECOGNIZE element
  // it('should spy on toggleView', function() {
  //   domUpdates.toggleView();

  //   expect(element.classList.remove).to.have.been.called(1);
  //   expect(element.classList.remove).to.have.been.called.with('hidden');
  //   expect(element.classList.add).to.have.been.called(2);
  //   expect(element.classList.add).to.have.been.called.with('hidden');
  // })

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
  })

}) 