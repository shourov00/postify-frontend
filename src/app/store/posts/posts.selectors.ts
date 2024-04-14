import {createSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from '@store/core/models/core.models';
import {PostsRes} from '@services/post/post.model';
import {PostState} from '@store/posts/models/posts.model';
import {selectPostsFeature} from '@store/core/core.reducer';

/** Selector Post state from Core state */
export const selectAppState: MemoizedSelector<AppState, PostState> = createSelector(
  selectPostsFeature,
  (appState: PostState): PostState => appState
);

/** Selector posts from post selector */
export const postsResSelectors: MemoizedSelector<AppState, PostsRes | null> = createSelector(
  selectAppState,
  (appState: PostState) => appState.postsRes
);

/** Selector error state from post selector */
export const errorSelector: MemoizedSelector<AppState, string | null> = createSelector(
  selectAppState,
  (appState: PostState) => appState.error
);
