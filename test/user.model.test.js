import * as userService from '../app/models/user.server';

describe('User Service Tests', () => {
  test('getUserByEmail - Valid email', async () => {
    const user = await userService.getUserByEmail('test@example.com');
    expect(user).toBeDefined();
  });

  test('createUser - Unique email -- deleteUserByEmail', async () => {
    const userEmail = 'newusertest@example.com'
    const newUser = await userService.createUser(userEmail, 'password');
    expect(newUser).toBeDefined();
  });

  test('deleteUserByEmail - Valid email', async () => {
    const emailToDelete = 'newusertest@example.com';
    
    const deletedUser = await userService.deleteUserByEmail(emailToDelete);
    expect(deletedUser).toBeDefined();
  });

  test('deleteUserByEmailAllData', async () => {
    const emailToDelete = 'test@example.com';

    await userService.deleteUserByEmailAllData("test@example.com");

    
    //const deletedUser = await userService.deleteUserByEmailAllData(emailToDelete);
  });
});
