import {expect} from 'chai';
import UserRepo from '../src/UserRepo';
import User from '../src/User';

describe('UserRepo', function() {
  let user1, user2, user3, user4, userRepo;

  before(function() {
    user1 = { id: 10, name: "Taylor Swift" };
    user2 = { id: 17, name: 'Billie Eilish' };
    user3 = { id: 24, name: 'Hayley Williams'}
    user4 = { id: 3, name: 'Billie Joel' };
    userRepo = new UserRepo([user1, user2, user3]);
  });

  it('should be a function', function() {
    expect(UserRepo).to.be.a('function')
  });

  it('should be an instance of UserRepo', function() {
    expect(userRepo).to.be.an.instanceof(UserRepo);
  });

  it('should store users', function() {
    expect(userRepo.users[1].id).to.equal(17)
  });

  it('should store instances of User', function() {
    expect(userRepo.users[2]).to.be.an.instanceof(User);
  });

  it('given a full name, it should be able to return the user with that name', function() {
    const getUser = userRepo.findUser('Hayley Williams');

    expect(getUser).to.deep.equal({ id: 24, name: 'Hayley Williams' });
  });

  it('given a partial name, it should still be able to return the first user with that name', function() {
    const getUser = userRepo.findUser('Billie');

    expect(getUser).to.deep.equal({ id: 17, name: 'Billie Eilish' });
  });
});