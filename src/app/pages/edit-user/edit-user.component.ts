import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserStore } from '../../store/user.store';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserComponent implements OnInit, OnDestroy {
  user: User | null = null;
  loading: boolean;
  editForm!: FormGroup;
  userStore = inject(UserStore);
  subscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loading = this.userStore.loading();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.subscription = this.userStore.loadUser(id).subscribe((user) => {
      this.user = user;
      this.initForm();
    });
  }

  initForm(): void {
    if (this.user) {
      this.editForm = this.fb.group({
        first_name: [this.user.first_name],
        last_name: [this.user.last_name],
        email: [this.user.email],
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.user) {
      const updatedUser: User = {
        ...this.user,
        ...this.editForm.value,
      };
      this.userStore.updateUser(updatedUser.id, updatedUser);
      this.user = updatedUser;
      this.router.navigate(['/user', this.user.id]);
    }
  }

  goBack(): void {
    if (this.user) {
      this.router.navigate(['/user', this.user.id]);
    }
  }
}
