import {expect} from 'chai';
import UserRepo from '../src/UserRepo';
import User from '../src/User';

describe.only('UserRepo', function() {
  let user1, user2, userRepo;

  before(function() {
    user1 = { id: 10, name: "Taylor Swift" };
    user2 = { id: 17, name: 'Billie Eilish' };
    userRepo = new UserRepo([user1, user2]);
  });

  it('should be a function', function() {
    expect(UserRepo).to.be.a('function')
  });

  it('should be an instance of UserRepo', function() {
    expect(userRepo).to.be.an.instanceof(UserRepo);
  });

  it('should store users', function() {
    expect(userRepo.users[1].id).to.equal(17)
  })

  it('should store instances of User', function() {
    expect(userRepo.users[0]).to.be.an.instanceof(User);
  });


})