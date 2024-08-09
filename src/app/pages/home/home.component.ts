import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserStore } from '../../store/user.store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = true;
  // just for showing ui not accurate,it have to move to store and be dynamic based on data will be displayed
  page = 1;
  totalItems = 12;
  itemsPerPage = 6;
  router = inject(Router);
  userStore = inject(UserStore);
  subscription: Subscription = new Subscription();

  constructor() {
    effect(() => {
      this.users = this.userStore.usersEntities();
      this.loading = this.userStore.loading();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.subscription = this.userStore.loadUsers(this.page).subscribe(() => {});
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadUsers();
  }

  navigateToUser(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
