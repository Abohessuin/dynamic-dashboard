import { User } from '../models/user.model';

export const user1: User = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  avatar: '',
};
export const user2: User = {
  id: 2,
  first_name: 'Jane',
  last_name: 'Smith',
  email: 'jane.smith@example.com',
  avatar: '',
};
export const user3: User = {
  id: 3,
  first_name: 'Alice',
  last_name: 'Johnson',
  email: 'alice.johnson@example.com',
  avatar: '',
};

export const userCache = new Map<number, User[]>([
  [1, [user1, user2]],
  [2, [user3]],
]);
