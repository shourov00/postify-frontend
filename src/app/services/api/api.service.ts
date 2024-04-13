import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: Options): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(url, options) as Observable<HttpResponse<T>>;
  }
}
