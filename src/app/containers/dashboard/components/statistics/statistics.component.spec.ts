import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsComponent } from './statistics.component';
import { PostsFacade } from '@store/posts/posts.facade';
import { AlbumsFacade } from '@store/albums/albums.facade';
import { PhotosFacade } from '@store/photos/photos.facade';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let mockPostsFacade: Partial<PostsFacade>;
  let mockAlbumsFacade: Partial<AlbumsFacade>;
  let mockPhotosFacade: Partial<PhotosFacade>;

  beforeEach(async () => {
    mockPostsFacade = {
      loadPosts: jest.fn(),
      error$: throwError('Failed to load albums'),
      postsRes$: of(null)
    };

    mockAlbumsFacade = {
      albumsRes$: of(null),
      loadAlbums: jest.fn(),
      error$: throwError('Failed to load albums')
    };

    mockPhotosFacade = {
      loadPhotos: jest.fn(),
      photosRes$: of(null)
    };

    await TestBed.configureTestingModule({
      imports: [
        StatisticsComponent,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right'
        })
      ],
      providers: [
        { provide: PostsFacade, useValue: mockPostsFacade },
        { provide: AlbumsFacade, useValue: mockAlbumsFacade },
        { provide: PhotosFacade, useValue: mockPhotosFacade }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load data successfully', () => {
    expect(component).toBeTruthy();
    expect(component.postsFacade.postsRes$).toBeDefined();
    expect(component.albumsFacade.albumsRes$).toBeDefined();
    expect(component.photosFacade.photosRes$).toBeDefined();
  });
});
