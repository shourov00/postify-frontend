import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { SearchFiltersComponent } from '../../../../components/search-filters/search-filters.component';
import { Breadcrumb } from '../../../../components/breadcrumbs/breadcrumbs.model';
import { AlbumService } from '@services/album/album.service';
import { debounceTime } from 'rxjs/operators';
import { User } from '@services/user/user.model';
import { Album } from '@services/album/album.model';
import { UserService } from '@services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Photo, PhotosRes } from '@services/photo/photo.model';
import { forkJoin, Observable, Subject } from 'rxjs';
import { PhotoService } from '@services/photo/photo.service';
import { QueryLocalParams, QueryParams } from '@services/api/api.model';
import {environment} from "@env/environment";

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [BreadcrumbsComponent, NgForOf, NgIf, PaginationComponent, RouterLink, SearchFiltersComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit {
  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Albums',
      link: '/albums'
    }
  ];

  id?: string;

  // DATA
  album?: Album;
  users: User[] = [];
  photosRes?: PhotosRes;

  // PAGINATION
  currentPage: number = 1;
  lastPage: number = 1;
  itemsPerPage: number = environment.elementsPerPage;

  // SEARCHING
  searchText: string = '';
  searchInput: Subject<string> = new Subject<string>();

  constructor(
    private userService: UserService,
    private photosService: PhotoService,
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.breadcrumbs.push({
      title: 'Album details',
      link: `/albums/${this.id}`,
      isActive: true
    });
  }

  ngOnInit(): void {
    this.spinner.show();

    if (this.id) {
      const userAPI: Observable<User[]> = this.userService.getUsers();
      const albumAPI: Observable<Album> = this.albumService.getAlbumDetails(this.id);

      forkJoin([userAPI, albumAPI]).subscribe(([users, album]: [User[], Album]) => {
        this.users = users;
        this.album = album;
        this.spinner.hide();
      });

      this.route.queryParams.subscribe(params => {
        this.loadAlbumPhotos(params);
      });

      this.searchInput.pipe(debounceTime(500)).subscribe(value => {
        this.applySearch(value);
      });
    }
  }

  findUserById(userId: number): User | null {
    return this.userService.findUserById(userId, this.users);
  }

  queryPosts({ page, limit, search }: QueryLocalParams): void {
    const queryParams: QueryLocalParams = {
      page: page || 1,
      limit: limit || this.itemsPerPage,
      search: search || this.searchText
    };

    // Clean query params
    Object.keys(queryParams).forEach(key => queryParams[key] == '' && delete queryParams[key]);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }

  loadAlbumPhotos({ page, limit, search }: QueryLocalParams): void {
    this.spinner.show();

    const queryParams: QueryParams = {
      _page: page || this.currentPage,
      _limit: limit || this.itemsPerPage
    };

    if (search) queryParams['title_like'] = search; // search by title
    if (this.id) queryParams['albumId'] = this.id; // get all photos by albumId

    this.photosService.getPhotos(queryParams).subscribe((photoRes: PhotosRes) => {
      this.photosRes = photoRes;
      this.currentPage = photoRes.currentPage;
      this.lastPage = photoRes.lastPage;
      this.itemsPerPage = photoRes.perPage;
      this.searchText = search || '';

      this.spinner.hide();
    });
  }

  applySearch(search: string): void {
    this.queryPosts({
      search
    });
  }

  onSearchInput(value: string): void {
    this.searchText = value;
    this.searchInput.next(value.trim());
  }

  onItemsPerPageSelected(value: number): void {
    this.queryPosts({
      limit: value
    });
  }

  onPageChange(pageNumber: number): void {
    this.queryPosts({
      page: pageNumber
    });
  }

  trackByPhoto(index: number, item: Photo): number {
    return item.id;
  }
}
