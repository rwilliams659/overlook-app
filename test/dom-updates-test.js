const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/dom-updates';

chai.use(spies);

describe.only('domUpdates', function() {
  before(function() {
    //define user/room/booking object needed for tests here 
    
    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector'], () => {
      return {
        innerText: '',
        insertAdjacentHTML: () => { },
        // forEach: () => { }
      }
    });

    global.element = {};
    // chai.spy.on(element, ['classList.add', 'classList.remove'], () => {
    //   return {
    //     add: '',
    //     remove: '', 
    //     insertAdjacentHTML: () => { },
    //   }
    // });
  });

  // it('should spy on toggleView', function() {
  //   domUpdates.toggleView();

  //   expect(element.classList.remove).to.have.been.called(1);
  //   expect(element.classList.remove).to.have.been.called.with('hidden');
  //   expect(element.classList.add).to.have.been.called(2);
  //   expect(element.classList.add).to.have.been.called.with('hidden');
  // })

})