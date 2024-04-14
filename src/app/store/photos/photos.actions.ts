import { createAction, props } from '@ngrx/store';
import { PhotosRes } from '@services/photo/photo.model';
import { featureName } from '@store/photos/models/photos.model';
import { QueryParams } from '@services/api/api.model';

export const getPhotos = createAction(`[${featureName}] get photos`, props<{ params: QueryParams }>());

export const getPhotosSuccess = createAction(`[${featureName}] get photos success`, props<{ photosRes: PhotosRes }>());

export const getPhotosFailure = createAction(`[${featureName}] get photos failure`, props<{ error: string }>());
