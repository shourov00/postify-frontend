import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '@store/core/models/core.models';
import { PhotosRes } from '@services/photo/photo.model';
import { PhotoState } from '@store/photos/models/photos.model';
import { selectPhotosFeature } from '@store/core/core.reducer';

/** Selector Photo state from Core state */
export const selectAppState: MemoizedSelector<AppState, PhotoState> = createSelector(
  selectPhotosFeature,
  (appState: PhotoState): PhotoState => appState
);

/** Selector photos from photo selector */
export const photosResSelectors: MemoizedSelector<AppState, PhotosRes | null> = createSelector(
  selectAppState,
  (appState: PhotoState) => appState.photosRes
);

/** Selector error state from photo selector */
export const errorSelector: MemoizedSelector<AppState, string | null> = createSelector(
  selectAppState,
  (appState: PhotoState) => appState.error
);
