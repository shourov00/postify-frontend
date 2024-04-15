import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@store/core/models/core.models';
import { AlbumsRes } from '@services/album/album.model';
import { selectAlbumsResSelectors, selectErrorSelector } from '@store/albums/albums.selectors';

import * as AlbumsActions from './albums.actions';
import { QueryParams } from '@services/api/api.model';

@Injectable({ providedIn: 'root' })
export class AlbumsFacade {
  private readonly store: Store<AppState> = inject(Store);

  readonly albumsRes$: Observable<AlbumsRes | null> = this.store.select(selectAlbumsResSelectors);
  readonly error$: Observable<string | null> = this.store.select(selectErrorSelector);

  loadAlbums(params: QueryParams): void {
    this.store.dispatch(AlbumsActions.getAlbums({ params }));
  }
}
