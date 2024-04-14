import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  MemoizedSelector,
  on
} from '@ngrx/store';
import { AppState, InfoState } from './models/core.models';
import { screenModeFromWidth } from '@utility/screen-size-utility';

import * as CoreActions from './core.actions';
import { usersReducer } from '@store/users/users.reducer';
import {UserState} from "@store/users/models/users.model";

export const initialState: InfoState = {
  screenModeResolution: screenModeFromWidth(window.innerWidth),
  loader: false
};

export const reducer: ActionReducer<InfoState> = createReducer(
  initialState,
  on(CoreActions.updateScreenModeResolution, (state: InfoState, action) => {
    return {
      ...state,
      screenModeResolution: action.mode
    };
  }),
  on(CoreActions.actionSetLoading, (state, action) => {
    return { ...state, loader: action.loader };
  })
);

// combine reducer
export const reducers: ActionReducerMap<AppState> = {
  core: reducer,
  users: usersReducer
};

export const selectCoreFeature: MemoizedSelector<AppState, InfoState> = createFeatureSelector('core');
export const selectUsersFeature: MemoizedSelector<AppState, UserState> = createFeatureSelector('users');
