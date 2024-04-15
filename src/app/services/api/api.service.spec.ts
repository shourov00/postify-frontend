import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Options } from '@services/api/api.model';
import { HttpResponse } from '@angular/common/http';
import { User } from '@services/user/user.model';
import { createRandomUser } from '@services/user/user.service.spec';

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

  describe('get', () => {
    it('should make a GET request with options and return HttpResponse', () => {
      const url = 'https://example.com/api/data';
      const options: Options = { observe: 'response', headers: { 'Content-Type': 'application/json' } };

      const testData = createRandomUser();
      const httpResponse: HttpResponse<User> = new HttpResponse({ body: testData });

      apiService.get(url, options).subscribe(response => {
        expect(response).toEqual(httpResponse);
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');

      req.flush(testData);
    });
  });

  describe('getBody', () => {
    it('should make a GET request with options and return data only', () => {
      const url = 'https://example.com/api/data';
      const options: Options = { observe: 'response', headers: { 'Content-Type': 'application/json' } };

      const testData = createRandomUser();

      apiService.getBody<User>(url, options).subscribe(data => {
        setTimeout(() => {
          expect(data).toEqual(testData);
        }, 1000);
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');

      req.flush(testData);
      httpTestingController.verify();
    });
  });
});
