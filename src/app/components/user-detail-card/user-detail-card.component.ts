import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail-card',
  templateUrl: './user-detail-card.component.html',
  standalone: true,
})
export class UserDetailCardComponent {
  @Input() user!: User;
}
