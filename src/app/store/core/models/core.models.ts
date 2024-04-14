import { UserState } from '@store/users/models/users.model';

export interface AppState {
  core: InfoState;
  users: UserState;
}

export interface InfoState {
  screenModeResolution: ScreenModeResolution;
  loader: boolean;
}

export enum ScreenModeResolution {
  Mobile = 1,
  Small,
  Medium,
  Large
}
