import {expect} from 'chai';
import UserRepo from '../src/UserRepo';
import User from '../src/User';

describe('UserRepo', function() {
  let user1, user2, user3, user4, userRepo;

  before(function() {
    user1 = { id: 10, name: "Taylor Swift" };
    user2 = { id: 17, name: 'Billie Eilish' };
    user3 = { id: 24, name: 'Hayley Williams' }
    user4 = { id: 3, name: 'Billie Joel' };
    userRepo = new UserRepo([user1, user2, user3, user4]);
  });

  it('should be a function', function() {
    expect(UserRepo).to.be.a('function')
  });

  it('should be an instance of UserRepo', function() {
    expect(userRepo).to.be.an.instanceof(UserRepo);
  });

  it('should store an array of users', function() {
    expect(userRepo.users[1].id).to.equal(17)
  });

  it('each user it stores should be an instance of User', function() {
    expect(userRepo.users[2]).to.be.an.instanceof(User);
  });

  it('given a full name, it should be able to return the user with that name', function() {
    const getUser = userRepo.findUser('Hayley Williams');

    expect(getUser).to.deep.equal(user3);
  });

  it('given a partial name, it should still be able to return the first user with that name', function() {
    const getUser = userRepo.findUser('Billie');

    expect(getUser).to.deep.equal(user2);
  });

  it('given a name in any letter case, it should still be able to return the first user with that name', function() {
    const getUser = userRepo.findUser('billie');
    const getUser2 = userRepo.findUser('tAYLOr')

    expect(getUser).to.deep.equal(user2);
    expect(getUser2).to.deep.equal(user1);
  });

  it('given a non-string search term when trying to find a user, it should return undefined', function () {
    const getUser = userRepo.findUser(84);

    expect(getUser).to.deep.equal(undefined);
  });

  it('should be able to return a user based on an id', function() {
    const userName = userRepo.getUserFromId(10);

    expect(userName).to.deep.equal(user1);
  });

  it('if an id is passed in as a string, it should still be able to return a user based on an id', function () {
    const userName = userRepo.getUserFromId('3');

    expect(userName).to.deep.equal(user4);
  });

  it('if an argument other than a string or number is passed in for id, it should return undefined', function () {
    const userName = userRepo.getUserFromId({});

    expect(userName).to.deep.equal(undefined);
  });
});