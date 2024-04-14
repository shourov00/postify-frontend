import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, PostsRes } from '@services/post/post.model';
import { QueryParams } from '@services/api/api.model';
import { environment } from '@env/environment';
import { randomDate, randomNumber } from '@utility/date-utils';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '@services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private apiService: ApiService) {}

  getPosts = (params: QueryParams): Observable<PostsRes> => {
    return this.apiService.get<Post[]>(`${environment.apiUrl}/posts`, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Post[]>) => {
        const totalCount = Number(response.headers.get('X-Total-Count')) || 0;

        const posts = response.body || [];
        posts.forEach((post: Post) => {
          post.createdAt = randomDate();
          post.likeCount = randomNumber();
          post.views = randomNumber();
          post.shareCount = randomNumber();
        });

        return {
          total: totalCount,
          lastPage: Math.ceil(totalCount / params?._limit),
          currentPage: Number(params?._page),
          perPage: Number(params?._limit),
          posts: posts
        };
      })
    );
  };

  getPostDetails = (postId: string): Observable<Post> => {
    return this.apiService.getBody<Post>(`${environment.apiUrl}/posts/${postId}`).pipe();
  };
}
