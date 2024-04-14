import { createAction, props } from '@ngrx/store';
import { PostsRes } from '@services/post/post.model';
import { featureName } from '@store/posts/models/posts.model';
import { QueryParams } from '@services/api/api.model';

export const getPosts = createAction(`[${featureName}] get posts`, props<{ params: QueryParams }>());

export const getPostsSuccess = createAction(`[${featureName}] get posts success`, props<{ postsRes: PostsRes }>());

export const getPostsFailure = createAction(`[${featureName}] get posts failure`, props<{ error: string }>());
