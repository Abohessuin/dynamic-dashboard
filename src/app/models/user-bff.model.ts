import { User } from './user.model';

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}

export interface UserResponse {
  data: User;
  support: Support;
}
