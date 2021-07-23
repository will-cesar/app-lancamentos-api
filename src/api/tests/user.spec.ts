import { User } from '@entities/user';

test('it should be ok', () => {
  const user = new User(); 

  user.firstName = 'Will';

  expect(user.firstName).toEqual('Will');
}); 
