import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe: 'response';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface QueryParams {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;

  _page: number;
  _limit: number;
}

export interface QueryLocalParams {
  [key: string]: string | number | undefined;
  page?: number;
  limit?: number;
  search?: string;
  userId?: string;
  sortBy?: string;
  order?: string;
}
