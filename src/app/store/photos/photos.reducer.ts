import { Action, createReducer, on } from '@ngrx/store';

import * as PhotosActions from './photos.actions';
import { photosInit, PhotoState } from '@store/photos/models/photos.model';

export const reducer = createReducer(
  photosInit,
  on(PhotosActions.getPhotos, (state: PhotoState) => {
    return {
      ...state
    };
  }),
  on(PhotosActions.getPhotosSuccess, (state: PhotoState, action) => {
    return {
      ...state,
      photosRes: action.photosRes
    };
  }),
  on(PhotosActions.getPhotosFailure, (state: PhotoState, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);

export function photosReducer(state: PhotoState | undefined, action: Action): PhotoState {
  return reducer(state, action);
}
