import { AlbumsRes } from '@services/album/album.model';

export const featureName = 'Albums';

export interface AlbumState {
  albumsRes: AlbumsRes | null;
  error: string | null;
}

export const albumsInit: AlbumState = {
  albumsRes: null,
  error: null
};
