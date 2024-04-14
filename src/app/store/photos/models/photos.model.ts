import { PhotosRes } from '@services/photo/photo.model';

export const featureName = 'Photos';

export interface PhotoState {
  photosRes: PhotosRes | null;
  error: string | null;
}

export const photosInit: PhotoState = {
  photosRes: null,
  error: null
};
