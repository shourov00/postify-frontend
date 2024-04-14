import { createAction, props } from '@ngrx/store';
import { featureName } from '@store/users/models/users.model';
import { User } from '@services/user/user.model';

export const getUsers = createAction(`[${featureName}] get users`);

export const getUsersSuccess = createAction(`[${featureName}] get users success`, props<{ users: User[] }>());

export const getUsersFailure = createAction(`[${featureName}] get users failure`, props<{ error: string }>());
