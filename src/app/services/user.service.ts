import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { GetUsersResponse, UserResponse } from '../models/user-bff.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    return this.http
      .get<GetUsersResponse>(`https://reqres.in/api/users?page=${page}`)
      .pipe(map((response) => response.data));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(map((response) => response.data));
  }
}
