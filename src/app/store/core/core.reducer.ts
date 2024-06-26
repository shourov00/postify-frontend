import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  MemoizedSelector,
  on
} from '@ngrx/store';
import { AppState, InfoState } from './models/core.models';
import { screenModeFromWidth } from '@utils/screen-size-utils';

import * as CoreActions from './core.actions';
import { usersReducer } from '@store/users/users.reducer';
import { UserState } from '@store/users/models/users.model';
import { postsReducer } from '@store/posts/posts.reducer';
import { PostState } from '@store/posts/models/posts.model';
import { albumsReducer } from '@store/albums/albums.reducer';
import { AlbumState } from '@store/albums/models/albums.model';
import { photosReducer } from '@store/photos/photos.reducer';
import { PhotoState } from '@store/photos/models/photos.model';

export const initialState: InfoState = {
  screenModeResolution: screenModeFromWidth(window.innerWidth),
  loader: false
};

export const reducer: ActionReducer<InfoState> = createReducer(
  initialState,
  on(CoreActions.updateScreenModeResolution, (state: InfoState, action): InfoState => {
    return {
      ...state,
      screenModeResolution: action.mode
    };
  }),
  on(CoreActions.actionSetLoading, (state, action): InfoState => {
    return { ...state, loader: action.loader };
  })
);

// combine reducer
export const reducers: ActionReducerMap<AppState> = {
  core: reducer,
  users: usersReducer,
  posts: postsReducer,
  albums: albumsReducer,
  photos: photosReducer
};

export const selectCoreFeature: MemoizedSelector<AppState, InfoState> = createFeatureSelector('core');
export const selectUsersFeature: MemoizedSelector<AppState, UserState> = createFeatureSelector('users');
export const selectPostsFeature: MemoizedSelector<AppState, PostState> = createFeatureSelector('posts');
export const selectAlbumsFeature: MemoizedSelector<AppState, AlbumState> = createFeatureSelector('albums');
export const selectPhotosFeature: MemoizedSelector<AppState, PhotoState> = createFeatureSelector('photos');
