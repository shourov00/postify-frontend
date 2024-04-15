import { UserState } from '@store/users/models/users.model';
import { PostState } from '@store/posts/models/posts.model';
import { AlbumState } from '@store/albums/models/albums.model';
import { PhotoState } from '@store/photos/models/photos.model';

export interface AppState {
  core: InfoState;
  users: UserState;
  posts: PostState;
  albums: AlbumState;
  photos: PhotoState;
}

export interface InfoState {
  screenModeResolution: ScreenModeResolution;
  loader: boolean;
}

export enum ScreenModeResolution {
  Mobile = 1,
  Small,
  Medium,
  Large
}
