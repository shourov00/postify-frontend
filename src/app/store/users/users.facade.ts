import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@store/core/models/core.models';
import { User } from '@services/user/user.model';
import { selectErrorSelector, selectUsersSelectors } from '@store/users/users.selectors';

import * as UsersActions from './users.actions';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly store: Store<AppState> = inject(Store);

  readonly users$: Observable<User[]> = this.store.select(selectUsersSelectors);
  readonly error$: Observable<string | null> = this.store.select(selectErrorSelector);

  loadUsers(): void {
    this.store.dispatch(UsersActions.getUsers());
  }
}
