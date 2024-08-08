import { User } from '../models/user.model';

export function loadCachedUser(id: number, cachedUser: Map<number, User[]>) {
  for (const users of cachedUser.values()) {
    const user = users.find((user) => user.id === id);
    if (user) {
      return user;
    }
  }
  return undefined;
}

export function updateCache(updatedUser: User, userCache: Map<number, User[]>) {
  for (const [page, users] of userCache.entries()) {
    const index = users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      userCache.set(page, users);
      break;
    }
  }
  return userCache;
}
