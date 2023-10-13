import { Roles } from './roles';
import { Users } from './users';

describe('Users', () => {
  let users: Users;

  beforeEach(() => {
    users = new Users(
      1, // id
      'test@example.com', // email
      'password', // password
      'John', // firstName
      'Doe', // lastName
      'Male', // gender
      'photo.jpg', // photos
      true, // enabled
      [new Roles(1, 'Admin', 'all')] // roles
    );
  });

  it('should create an instance of Users', () => {
    expect(users).toBeTruthy();
    expect(users.id).toEqual(1);
    expect(users.email).toEqual('test@example.com');
    expect(users.password).toEqual('password');
    expect(users.firstName).toEqual('John');
    expect(users.lastName).toEqual('Doe');
    expect(users.gender).toEqual('Male');
    expect(users.photos).toEqual('photo.jpg');
    expect(users.enabled).toEqual(true);
    expect(users.roles.length).toEqual(1);
    expect(users.roles[0].id).toEqual(1);
    expect(users.roles[0].name).toEqual('Admin');
  });
});
