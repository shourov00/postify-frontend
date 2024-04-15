import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
