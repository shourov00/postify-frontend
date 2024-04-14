import { Action, createReducer, on } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { postsInit, PostState } from '@store/posts/models/posts.model';

export const reducer = createReducer(
  postsInit,
  on(PostsActions.getPosts, (state: PostState) => {
    return {
      ...state
    };
  }),
  on(PostsActions.getPostsSuccess, (state: PostState, action) => {
    return {
      ...state,
      postsRes: action.postsRes
    };
  }),
  on(PostsActions.getPostsFailure, (state: PostState, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);

export function postsReducer(state: PostState | undefined, action: Action): PostState {
  return reducer(state, action);
}
