import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '@services/user/user.model';
import { ApiService } from '@services/api/api.service';
import { HttpResponse } from '@angular/common/http';
import { Album, AlbumsRes } from '@services/album/album.model';
import { Photo, PhotosRes } from '@services/photo/photo.model';
import { Post, PostsRes } from '@services/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUsers = (): Observable<User[]> => {
    return this.apiService.getBody<User[]>(`${environment.apiUrl}/users`).pipe();
  };

  getUserDetails = (userId: string): Observable<User | null> => {
    return this.apiService.getBody<User>(`${environment.apiUrl}/users/${userId}`).pipe(
      switchMap((user: User) => {
        if (!user) {
          return of(null);
        }

        // Retrieve users posts and albums
        const postUrl = `${environment.apiUrl}/posts?userId=${user.id}`;
        const posts$: Observable<Post[]> = this.apiService.getBody<Post[]>(postUrl);

        const albumUrl = `${environment.apiUrl}/albums?userId=${user.id}`;
        const albums$: Observable<Post[]> = this.apiService.getBody<Post[]>(albumUrl);

        return forkJoin([posts$, albums$]).pipe(
          map(([posts, albums]: [Post[], Album[]]) => {
            return {
              ...user,
              posts,
              albums
            };
          })
        );
      })
    );
  };
}
