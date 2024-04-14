import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // get data response object
  get<T>(url: string, options: Options): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(url, options) as Observable<HttpResponse<T>>;
  }

  // get data only
  getBody<T>(url: string, options?: Options): Observable<T> {
    return this.httpClient.get<T>(url, { ...options, observe: 'body' }) as Observable<T>;
  }
}
