import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '@store/core/models/core.models';
import { selectUsersFeature } from '@store/core/core.reducer';
import { UserState } from '@store/users/models/users.model';
import { User } from '@services/user/user.model';

/** Selector User state from Core state */
export const selectAppState: MemoizedSelector<AppState, UserState> = createSelector(
  selectUsersFeature,
  (appState: UserState): UserState => appState
);

/** Selector users from user selector */
export const selectUsersSelectors: MemoizedSelector<AppState, User[]> = createSelector(
  selectAppState,
  (appState: UserState) => appState.users
);

/** Selector error state from user selector */
export const selectErrorSelector: MemoizedSelector<AppState, string | null> = createSelector(
  selectAppState,
  (appState: UserState) => appState.error
);
