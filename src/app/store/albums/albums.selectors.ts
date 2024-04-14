import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '@store/core/models/core.models';
import { AlbumsRes } from '@services/album/album.model';
import { AlbumState } from '@store/albums/models/albums.model';
import { selectAlbumsFeature } from '@store/core/core.reducer';

/** Selector Album state from Core state */
export const selectAppState: MemoizedSelector<AppState, AlbumState> = createSelector(
  selectAlbumsFeature,
  (appState: AlbumState): AlbumState => appState
);

/** Selector albums from album selector */
export const albumsResSelectors: MemoizedSelector<AppState, AlbumsRes | null> = createSelector(
  selectAppState,
  (appState: AlbumState) => appState.albumsRes
);

/** Selector error state from album selector */
export const errorSelector: MemoizedSelector<AppState, string | null> = createSelector(
  selectAppState,
  (appState: AlbumState) => appState.error
);
