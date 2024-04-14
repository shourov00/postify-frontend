import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Options} from "@services/api/api.model";
import {HttpResponse} from "@angular/common/http";
import {da} from "@faker-js/faker";

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  // describe('get', () => {
  //   it('should make a GET request with options and return HttpResponse', () => {
  //     const url = 'https://example.com/api/data';
  //     const options: Options = {observe: "response", headers: { 'Content-Type': 'application/json' } };
  //
  //     const testData = { id: 1, name: 'Test user' };
  //     const httpResponse: HttpResponse<any> = new HttpResponse({ body: testData });
  //
  //     apiService.get<any>(url, options).subscribe(response => {
  //       expect(response).toEqual(httpResponse);
  //     });
  //
  //     const req = httpTestingController.expectOne(url);
  //     expect(req.request.method).toEqual('GET');
  //     expect(req.request.headers.get('Content-Type')).toEqual('application/json');
  //
  //     req.flush(testData);
  //   });
  // });
  //
  // describe('getBody', () => {
  //   it('should make a GET request with options and return data only', () => {
  //     const url = 'https://example.com/api/data';
  //     const options: Options = {observe: "response", headers: { 'Content-Type': 'application/json' } };
  //
  //     const testData = { id: 1, name: 'Test' };
  //
  //     apiService.getBody<any>(url, options).subscribe(data => {
  //       console.log(data)
  //       setTimeout(() => {
  //         expect(data).toEqual(testData);
  //       }, 1000);
  //     });
  //
  //     const req = httpTestingController.expectOne(url);
  //     expect(req.request.method).toEqual('GET');
  //     expect(req.request.headers.get('Content-Type')).toEqual('application/json');
  //
  //     req.flush([]);
  //     httpTestingController.verify();
  //   });
  // });
});
