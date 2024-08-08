import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  standalone: true,
})
export class UserCardComponent {
  @Input() user!: User;
  router = inject(Router);

  navigateToUser(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
