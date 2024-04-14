import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState, InfoState, ScreenModeResolution } from '@store/core/models/core.models';
import { selectCoreFeature } from '@store/core/core.reducer';

/** Selector Info state from Core state */
export const selectAppState: MemoizedSelector<AppState, InfoState> = createSelector(
  selectCoreFeature,
  (appState: InfoState): InfoState => appState
);

/** Selector Screen mode resolution from info state */
export const selectScreenModeResolution: MemoizedSelector<AppState, ScreenModeResolution> = createSelector(
  selectAppState,
  (appState: InfoState) => appState.screenModeResolution
);
