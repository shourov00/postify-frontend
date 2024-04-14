import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.model';
import { User } from '@services/user/user.model';
import { Album, AlbumsRes } from '@services/album/album.model';
import { Subject } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QueryLocalParams, QueryParams } from '@services/api/api.model';
import { debounceTime } from 'rxjs/operators';
import { AlbumService } from '@services/album/album.service';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import {environment} from "@env/environment";

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgForOf,
    NgIf,
    PaginationComponent,
    ReactiveFormsModule,
    FormsModule,
    SearchFiltersComponent,
    RouterLink
  ],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent implements OnInit {
  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Albums',
      link: '/albums',
      isActive: true
    }
  ];

  // DATA
  albumsRes?: AlbumsRes;
  users: User[] = [];

  // PAGINATION
  currentPage: number = 1;
  lastPage: number = 1;
  itemsPerPage: number = environment.elementsPerPage;

  // SEARCHING
  searchText: string = '';
  searchInput: Subject<string> = new Subject<string>();

  // FILTERING
  selectedUserId: string = '';

  constructor(
    private albumService: AlbumService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.route.queryParams.subscribe(params => {
      this.loadAlbums(params);
    });

    this.searchInput.pipe(debounceTime(500)).subscribe(value => {
      this.applySearch(value);
    });
  }

  queryPosts({ page, limit, search, userId }: QueryLocalParams): void {
    const queryParams: QueryLocalParams = {
      page: page || 1,
      limit: limit || this.itemsPerPage,
      search: search || this.searchText,
      userId: userId || this.selectedUserId
    };

    // Clean query params
    Object.keys(queryParams).forEach(key => queryParams[key] == '' && delete queryParams[key]);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  loadAlbums({ page, limit, search, userId }: QueryLocalParams): void {
    this.spinner.show();

    const queryParams: QueryParams = {
      _page: page || this.currentPage,
      _limit: limit || this.itemsPerPage
    };

    if (search) queryParams['title_like'] = search; // search by title
    if (userId) queryParams['userId'] = userId; // filter by userId

    this.albumService.getAlbums(queryParams).subscribe((albumsRes: AlbumsRes) => {
      this.albumsRes = albumsRes;
      this.currentPage = albumsRes.currentPage;
      this.lastPage = albumsRes.lastPage;
      this.itemsPerPage = albumsRes.perPage;
      this.searchText = search || '';
      this.selectedUserId = userId || '';

      this.spinner.hide();
    });
  }

  findUserById(userId: number): User | null {
    return this.userService.findUserById(userId, this.users);
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

  onUserSelected(value: string): void {
    this.selectedUserId = value;
    this.queryPosts({
      userId: value
    });
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

  trackByAlbum(index: number, item: Album): number {
    return item.id;
  }
}
