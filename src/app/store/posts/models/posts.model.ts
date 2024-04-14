import { PostsRes } from '@services/post/post.model';

export const featureName = 'Posts';

export interface PostState {
  postsRes: PostsRes | null;
  error: string | null;
}

export const postsInit: PostState = {
  postsRes: null,
  error: null
};
