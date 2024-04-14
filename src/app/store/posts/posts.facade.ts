import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@store/core/models/core.models';
import { PostsRes } from '@services/post/post.model';
import { errorSelector, postsResSelectors } from '@store/posts/posts.selectors';

import * as PostsActions from './posts.actions';
import { QueryParams } from '@services/api/api.model';

@Injectable({ providedIn: 'root' })
export class PostsFacade {
  private readonly store: Store<AppState> = inject(Store);

  readonly postsRes$: Observable<PostsRes | null> = this.store.select(postsResSelectors);
  readonly error$: Observable<string | null> = this.store.select(errorSelector);

  loadPosts(params: QueryParams): void {
    this.store.dispatch(PostsActions.getPosts({ params }));
  }
}
