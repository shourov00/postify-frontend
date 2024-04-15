import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { usersInit, UserState } from '@store/users/models/users.model';

export const reducer = createReducer(
  usersInit,
  on(UsersActions.getUsers, (state: UserState): UserState => {
    return {
      ...state
    };
  }),
  on(UsersActions.getUsersSuccess, (state: UserState, action): UserState => {
    return {
      ...state,
      users: action.users
    };
  }),
  on(UsersActions.getUsersFailure, (state: UserState, action): UserState => {
    return {
      ...state,
      error: action.error
    };
  })
);

export function usersReducer(state: UserState | undefined, action: Action): UserState {
  return reducer(state, action);
}
