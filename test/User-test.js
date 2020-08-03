import {expect} from 'chai';
import User from '../src/User';

describe.only('User', function() {
  let user1, user2;

  before(function() {
    user1 = new User({ id: 10, name: "Taylor Swift" })
    user2 = new User({ id: 17, name: 'Billie Eilish' })
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

  it('if user id property does not exist, it should set a default value of null', function () {
    const user = new User({name: 'Matt Bellamy'});

    expect(user).to.deep.equal({id: null, name: 'Matt Bellamy'});
  });

  it('if name property does not exist, it should set a default value of guest', function () {
    const user = new User({ id: 9});

    expect(user).to.deep.equal({id: 9, name: 'Guest'});
  });

  it('if an object is not passed in, it should create an object with all default values', function () {
    const user = new User(100);

    expect(user).to.deep.equal({id: null, name: 'Guest'})
  });

  it('if no argument is passed on, it should instantiate an object will all default values', function () {
    const user = new User();

    expect(user).to.deep.equal({id: null, name: 'Guest'})
  })
})