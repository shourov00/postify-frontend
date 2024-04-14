import { createAction, props } from '@ngrx/store';
import { AlbumsRes } from '@services/album/album.model';
import { featureName } from '@store/albums/models/albums.model';
import { QueryParams } from '@services/api/api.model';

export const getAlbums = createAction(`[${featureName}] get albums`, props<{ params: QueryParams }>());

export const getAlbumsSuccess = createAction(`[${featureName}] get albums success`, props<{ albumsRes: AlbumsRes }>());

export const getAlbumsFailure = createAction(`[${featureName}] get albums failure`, props<{ error: string }>());
