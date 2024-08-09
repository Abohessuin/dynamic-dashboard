import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../../store/user.store';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | undefined;
  loading = true;
  userStore = inject(UserStore);
  subscription: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, private router: Router) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    effect(() => {
      this.loading = this.userStore.loading();
      this.user = this.userStore.usersEntities().find((user) => user.id === id);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.subscription = this.userStore.loadUser(id).subscribe(() => {});
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
