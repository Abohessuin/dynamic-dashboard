import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { UserStore } from '../../store/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class HeaderComponent {
  searchControl = new FormControl();
  userStore = inject(UserStore);
  router = inject(Router);

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((id) => this.userStore.loadUser(parseInt(id)))
      )
      .subscribe();
  }
}
