import {expect} from 'chai';
import User from '../src/User';

describe('User', function() {
  let user1, user2; 

  beforeEach(function() {
    user1 = new User({id: 10, name: "Taylor Swift"})
    user2 = new User({id: 17, name: 'Billie Eilish'})
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(user1.id).to.equal(10);
  });

  it('should have a name', function() {
    expect(user2.name).to.equal('Billie Eilish');
  });
})