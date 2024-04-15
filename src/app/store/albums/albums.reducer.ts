import { Action, createReducer, on } from '@ngrx/store';

import * as AlbumsActions from './albums.actions';
import { albumsInit, AlbumState } from '@store/albums/models/albums.model';

export const reducer = createReducer(
  albumsInit,
  on(AlbumsActions.getAlbums, (state: AlbumState): AlbumState => {
    return {
      ...state
    };
  }),
  on(AlbumsActions.getAlbumsSuccess, (state: AlbumState, action): AlbumState => {
    return {
      ...state,
      albumsRes: action.albumsRes
    };
  }),
  on(AlbumsActions.getAlbumsFailure, (state: AlbumState, action): AlbumState => {
    return {
      ...state,
      error: action.error
    };
  })
);

export function albumsReducer(state: AlbumState | undefined, action: Action): AlbumState {
  return reducer(state, action);
}
