import { user1, user2, user3, userCache } from './mock-user-data';
import { User } from '../models/user.model';
import { loadCachedUser, updateCache } from './user.util';

describe('User Store Utility Functions', () => {
  describe('loadCachedUser', () => {
    it('should return the user if found in the cache', () => {
      const result = loadCachedUser(2, userCache);
      expect(result).toEqual(user2);
    });

    it('should return undefined if the user is not found in the cache', () => {
      const result = loadCachedUser(4, userCache);
      expect(result).toBeUndefined();
    });
  });

  describe('updateCache', () => {
    it('should update the user in the cache if the user exists', () => {
      const updatedUser: User = {
        id: 2,
        first_name: 'Janet',
        last_name: 'Smith',
        email: 'janet.smith@example.com',
        avatar: '',
      };

      const updatedCache = new Map(userCache);
      const result = updateCache(updatedUser, updatedCache);

      expect(result.get(1)?.[1]).toEqual(updatedUser);
    });

    it('should not modify the cache if the user does not exist', () => {
      const updatedUser: User = {
        id: 4,
        first_name: 'Bob',
        last_name: 'Brown',
        email: 'bob.brown@example.com',
        avatar: '',
      };

      const updatedCache = new Map(userCache);
      const result = updateCache(updatedUser, updatedCache);

      expect(result.get(1)?.[0]).toEqual(user1);
      expect(result.get(1)?.[1]).toEqual(user2);
      expect(result.get(2)?.[0]).toEqual(user3);
    });
  });
});
