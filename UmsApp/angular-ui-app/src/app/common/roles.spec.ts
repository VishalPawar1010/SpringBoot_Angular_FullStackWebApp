import { Roles } from './roles';

// describe('Roles', () => {
//   it('should create an instance', () => {
//     // expect(new Roles()).toBeTruthy();
//   });
// });

describe('Roles', () => {
  it('should create a Roles instance', () => {
    const role = new Roles(
      1, // id
      'admin', // name
      'Administrator role' // description
    );

    expect(role).toBeDefined();
    expect(role.id).toEqual(1);
    expect(role.name).toEqual('admin');
    expect(role.description).toEqual('Administrator role');
  });
});
