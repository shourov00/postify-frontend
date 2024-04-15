import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@services/user/user.service';
import * as UsersActions from './users.actions';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { User } from '@services/user/user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class UsersEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  getUsers$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UsersActions.getUsers),
      mergeMap(() => {
        this.spinner.show();
        return this.userService.getUsers().pipe(
          map((users: User[]) => UsersActions.getUsersSuccess({ users })),
          catchError(error => of(UsersActions.getUsersFailure({ error: error.message }))),
          finalize(() => this.spinner.hide())
        );
      })
    );
  });
}
