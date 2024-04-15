import { TestBed } from '@angular/core/testing';

import { PhotoService } from './photo.service';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('PhotosService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
