import { Photo } from '@services/photo/photo.model';

export type AlbumsRes = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  albums: Album[];
};

export type Album = {
  id: number;
  userId: number;
  title: string;
  photos?: Photo[];
};
