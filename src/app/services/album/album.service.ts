import { Injectable } from '@angular/core';
import { ApiService } from '@services/api/api.service';
import { PaginationParams } from '@services/api/api.model';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpResponse } from '@angular/common/http';
import { Album, AlbumsRes } from '@services/album/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(private apiService: ApiService) {}

  getAlbums = (params: PaginationParams): Observable<AlbumsRes> => {
    return this.apiService.get<Album[]>(`${environment.apiUrl}/albums`, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Album[]>) => {
        const totalCount = Number(response.headers.get('X-Total-Count')) || 0;
        return {
          total: totalCount,
          lastPage: Math.ceil(totalCount / params?._limit),
          currentPage: params?._page,
          perPage: params?._limit,
          albums: response.body || []
        };
      })
    );
  };
}
