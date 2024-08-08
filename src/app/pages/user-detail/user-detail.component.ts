import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../../store/user.store';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  loading = true;
  userStore = inject(UserStore);
  constructor(private route: ActivatedRoute, private router: Router) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    effect(() => {
      this.loading = this.userStore.loading();
      this.user = this.userStore.usersEntities().find((user) => user.id === id);
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userStore.loadUser(id).subscribe(() => {});
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
  navigateToEdit(): void {
    if (this.user) {
      this.router.navigate([`/user/${this.user.id}/edit`]);
    }
  }
}
