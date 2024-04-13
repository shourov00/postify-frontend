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
    private albumService: AlbumService
  ) {}

  ngOnInit() {
    this.postService.getPosts({ _page: 1, _limit: 10 }).subscribe((postsRes: PostsRes) => {
      this.postsRes = postsRes;
    });

    this.photoService.getPhotos({ _page: 1, _limit: 20 }).subscribe((photosRes: PhotosRes) => {
      this.photosRes = photosRes;
    });

    this.albumService.getAlbums({ _page: 1, _limit: 1 }).subscribe((albumRes: AlbumsRes) => {
      this.albumRes = albumRes;
    });
  }
}
