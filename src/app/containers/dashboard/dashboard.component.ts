import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PostService } from '@services/post/post.service';
import { PostsRes } from '@services/post/post.model';
import { HeaderComponent } from '../../components/header/header.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PhotosRes } from '@services/photo/photo.model';
import { PhotoService } from '@services/photo/photo.service';
import { PhotosComponent } from './components/photos/photos.component';
import { AlbumsRes } from '@services/album/album.model';
import { AlbumService } from '@services/album/album.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    WelcomeCardComponent,
    ArticlesComponent,
    StatisticsComponent,
    PhotosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public postsRes?: PostsRes;
  public photosRes?: PhotosRes;
  public albumRes?: AlbumsRes;

  constructor(
    private postService: PostService,
    private photoService: PhotoService,
    private albumService: AlbumService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    const postsObs: Observable<PostsRes> = this.postService.getPosts({ _page: 1, _limit: 10 });
    const photosObs: Observable<PhotosRes> = this.photoService.getPhotos({ _page: 1, _limit: 20 });
    const albumsObs: Observable<AlbumsRes> = this.albumService.getAlbums({ _page: 1, _limit: 1 });

    forkJoin([postsObs, photosObs, albumsObs]).subscribe(
      ([postsRes, photosRes, albumRes]: [PostsRes, PhotosRes, AlbumsRes]) => {
        this.postsRes = postsRes;
        this.albumRes = albumRes;
        this.photosRes = photosRes;

        this.spinner.hide();
      }
    );
  }
}
