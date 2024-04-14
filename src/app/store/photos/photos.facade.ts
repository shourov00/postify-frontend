import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@store/core/models/core.models';
import { PhotosRes } from '@services/photo/photo.model';
import { errorSelector, photosResSelectors } from '@store/photos/photos.selectors';

import * as PhotosActions from './photos.actions';
import { QueryParams } from '@services/api/api.model';

@Injectable({ providedIn: 'root' })
export class PhotosFacade {
  private readonly store: Store<AppState> = inject(Store);

  readonly photosRes$: Observable<PhotosRes | null> = this.store.select(photosResSelectors);
  readonly error$: Observable<string | null> = this.store.select(errorSelector);

  loadPhotos(params: QueryParams): void {
    this.store.dispatch(PhotosActions.getPhotos({ params }));
  }
}
