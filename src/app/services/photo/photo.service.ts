import { Injectable } from '@angular/core';
import { QueryParams } from '@services/api/api.model';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Photo, PhotosRes } from '@services/photo/photo.model';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '@services/api/api.service';
import {Post} from "@services/post/post.model";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private apiService: ApiService) {}

  getPhotos = (params: QueryParams): Observable<PhotosRes> => {
    return this.apiService.get<Photo[]>(`${environment.apiUrl}/photos`, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Photo[]>) => {
        const totalCount = Number(response.headers.get('X-Total-Count')) || 0;
        return {
          total: totalCount,
          lastPage: Math.ceil(totalCount / params?._limit),
          currentPage: Number(params?._page),
          perPage: Number(params?._limit),
          photos: response.body || []
        };
      })
    );
  };


  getPhotoDetails = (photoId: string): Observable<Photo> => {
    return this.apiService.getBody<Photo>(`${environment.apiUrl}/photos/${photoId}`).pipe();
  };
}
