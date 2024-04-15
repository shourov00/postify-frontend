import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PhotosFacade } from '@store/photos/photos.facade';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Photo } from '@services/photo/photo.model';
import { errorSelector } from '@store/photos/photos.selectors';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let mockPhotosFacade: Partial<PhotosFacade>;
  let store: MockStore;
  let toastrService: ToastrService;

  beforeEach(async () => {
    mockPhotosFacade = {
      loadPhotos: jest.fn(),
      photosRes$: of(null),
      error$: of(null)
    };

    await TestBed.configureTestingModule({
      imports: [PhotosComponent, ToastrModule.forRoot()],
      providers: [
        { provide: PhotosFacade, useValue: mockPhotosFacade },
        provideMockStore({
          initialState: {}
        })
      ]
    }).compileComponents();

    toastrService = TestBed.inject(ToastrService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on init', () => {
    expect(mockPhotosFacade.loadPhotos).toHaveBeenCalledWith({ _page: 1, _limit: 20 });
  });

  it('should subscribe to error$ and show toastr error when error occurs', () => {
    const error = 'Failed to load photos';
    const toastrErrorSpy = jest.spyOn(toastrService, 'error');
    store.overrideSelector(errorSelector, error);

    component.ngOnInit();
    expect(toastrErrorSpy).toHaveBeenCalledWith(error);
  });

  it('should track photos by their id', () => {
    const index = 1;
    const photo: Photo = { id: 123, thumbnailUrl: 'example.jpg', title: 'name', albumId: 1, url: 'url' };
    const trackByResult = component.trackByPhoto(index, photo);

    expect(trackByResult).toEqual(photo.id);
  });
});
