import { Injectable } from '@angular/core';
import { PaginationParams } from '@services/api/api.model';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Photo, PhotosRes } from '@services/photo/photo.model';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '@services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private apiService: ApiService) {}

  getPhotos = (params: PaginationParams): Observable<PhotosRes> => {
    return this.apiService.get<Photo[]>(`${environment.apiUrl}/photos`, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Photo[]>) => {
        const totalCount = Number(response.headers.get('X-Total-Count')) || 0;
        return {
          total: totalCount,
          lastPage: Math.ceil(totalCount / params?._limit),
          currentPage: params?._page,
          perPage: params?._limit,
          photos: response.body || []
        };
      })
    );
  };
}
