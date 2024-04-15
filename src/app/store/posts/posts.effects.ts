import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '@services/post/post.service';
import * as PostsActions from './posts.actions';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostsRes } from '@services/post/post.model';

@Injectable()
export class PostsEffects {
  constructor(
    private action$: Actions,
    private postService: PostService,
    private spinner: NgxSpinnerService
  ) {}

  getPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap(action => {
        const params = action.params;
        this.spinner.show();
        return this.postService.getPosts(params).pipe(
          map((postsRes: PostsRes) => PostsActions.getPostsSuccess({ postsRes })),
          catchError(error => of(PostsActions.getPostsFailure({ error: error.message }))),
          finalize(() => this.spinner.hide())
        );
      })
    );
  });
}
