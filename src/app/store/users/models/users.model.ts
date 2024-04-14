import { User } from '@services/user/user.model';

export const featureName = 'Users';

export interface UserState {
  users: User[];
  error: string | null;
}

export const usersInit: UserState = {
  users: [],
  error: null
};
