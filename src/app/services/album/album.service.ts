import { Injectable } from '@angular/core';
import { ApiService } from '@services/api/api.service';
import { QueryParams } from '@services/api/api.model';
import { forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { environment } from '@env/environment';
import { HttpResponse } from '@angular/common/http';
import { Album, AlbumsRes } from '@services/album/album.model';
import { Photo } from '@services/photo/photo.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(private apiService: ApiService) {}

  getAlbums = (params: QueryParams): Observable<AlbumsRes> => {
    return this.apiService.get<Album[]>(`${environment.apiUrl}/albums`, { params, observe: 'response' }).pipe(
      switchMap((response: HttpResponse<Album[]>) => {
        const totalCount = Number(response.headers.get('X-Total-Count')) || 0;
        const albums: Album[] = response.body || [];

        if (!albums.length) {
          return of({
            total: totalCount,
            lastPage: Math.ceil(totalCount / params?._limit),
            currentPage: Number(params?._page),
            perPage: Number(params?._limit),
            albums: []
          });
        }

        // Create an array of observables for fetching photos for each album
        const photoRequests: Observable<Photo[]>[] = albums.map(album => {
          const url = `${environment.apiUrl}/photos?albumId=${album.id}&_limit=4`;
          return this.apiService.getBody<Photo[]>(url);
        });

        // Execute all photo requests in parallel
        return forkJoin(photoRequests).pipe(
          map(photosArray => {
            // Assign photos to their respective albums
            albums.forEach((album, index) => {
              album.photos = photosArray[index];
            });

            return {
              total: totalCount,
              lastPage: Math.ceil(totalCount / params?._limit),
              currentPage: Number(params?._page),
              perPage: Number(params?._limit),
              albums
            };
          })
        );
      })
    );
  };
}
