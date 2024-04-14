import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumService } from '@services/album/album.service';
import * as AlbumsActions from './albums.actions';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlbumsRes } from '@services/album/album.model';

@Injectable()
export class AlbumsEffects {
  constructor(
    private action$: Actions,
    private albumService: AlbumService,
    private spinner: NgxSpinnerService
  ) {}

  getAlbums$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlbumsActions.getAlbums),
      mergeMap(action => {
        const params = action.params;
        this.spinner.show();
        return this.albumService.getAlbums(params).pipe(
          map((albumsRes: AlbumsRes) => AlbumsActions.getAlbumsSuccess({ albumsRes })),
          catchError(error => of(AlbumsActions.getAlbumsFailure({ error: error.message }))),
          finalize(() => this.spinner.hide())
        );
      })
    )
  );
}
