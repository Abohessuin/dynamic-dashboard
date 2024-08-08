import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  removeAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loadCachedUser, updateCache } from './user.util';

interface UserState {
  userCache: Map<number, User[]>;
  loading: boolean;
  totalPages: number;
}
const instailState: UserState = {
  loading: false,
  userCache: new Map<number, User[]>(),
  totalPages: 0,
};

const USER_STATE = 'users';

export const UserStore = signalStore(
  withDevtools(USER_STATE),
  withState(instailState),
  withEntities({
    collection: USER_STATE,
    entity: type<User>(),
  }),
  withComputed(({ usersEntities }) => ({
    isAvailableUsers: computed(() => usersEntities.length > 0),
  })),
  withMethods((store) => {
    const userService = inject(UserService);

    const loadUsers = (page: number): Observable<User[]> => {
      const userCache = store.userCache();
      if (userCache.has(page)) {
        const users = userCache.get(page) as User[];
        patchState(store, removeAllEntities({ collection: USER_STATE }));
        patchState(store, addEntities(users, { collection: USER_STATE }));
        return of(userCache.get(page)!);
      }

      patchState(store, { loading: true });

      return userService.getUsers(page).pipe(
        tap((users) => {
          userCache.set(page, users);
          patchState(store, {
            userCache,
            loading: false,
          });
          patchState(store, removeAllEntities({ collection: USER_STATE }));
          patchState(store, addEntities(users, { collection: USER_STATE }));
        })
      );
    };

    const loadUser = (id: number): Observable<User | null> => {
      patchState(store, { loading: false });
      if (id) {
        const user = loadCachedUser(id, store.userCache());
        if (user) {
          patchState(store, removeAllEntities({ collection: USER_STATE }));
          patchState(store, addEntity(user, { collection: USER_STATE }));
          return of(user);
        }

        patchState(store, { loading: true });

        return userService.getUser(id).pipe(
          tap((user) => {
            patchState(store, { loading: false });
            patchState(store, removeAllEntities({ collection: USER_STATE }));
            patchState(store, addEntity(user, { collection: USER_STATE }));
          })
        );
      } else {
        const users = store.userCache().get(1) as User[];
        patchState(store, removeAllEntities({ collection: USER_STATE }));
        patchState(store, addEntities(users, { collection: USER_STATE }));
        return of(null);
      }
    };

    const updateUser = (id: number, changes: Partial<User>): void => {
      patchState(
        store,
        updateEntity({ changes, id }, { collection: USER_STATE })
      );
      updateCache(
        store.usersEntities().find((user) => user.id === id)!,
        store.userCache()
      );
    };

    return {
      loadUsers,
      loadUser,
      updateUser,
    };
  })
);
