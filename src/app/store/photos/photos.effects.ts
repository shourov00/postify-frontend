import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PhotoService } from '@services/photo/photo.service';
import * as PhotosActions from './photos.actions';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotosRes } from '@services/photo/photo.model';

@Injectable()
export class PhotosEffects {
  constructor(
    private action$: Actions,
    private photoService: PhotoService,
    private spinner: NgxSpinnerService
  ) {}

  getPhotos$ = createEffect(() =>
    this.action$.pipe(
      ofType(PhotosActions.getPhotos),
      mergeMap(action => {
        const params = action.params;
        this.spinner.show();
        return this.photoService.getPhotos(params).pipe(
          map((photosRes: PhotosRes) => PhotosActions.getPhotosSuccess({ photosRes })),
          catchError(error => of(PhotosActions.getPhotosFailure({ error: error.message }))),
          finalize(() => this.spinner.hide())
        );
      })
    )
  );
}
