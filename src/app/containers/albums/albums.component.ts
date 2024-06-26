import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.model';
import { User } from '@services/user/user.model';
import { Album, AlbumsRes } from '@services/album/album.model';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QueryLocalParams, QueryParams } from '@services/api/api.model';
import { debounceTime } from 'rxjs/operators';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { environment } from '@env/environment';
import { UsersFacade } from '@store/users/users.facade';
import { AlbumsFacade } from '@store/albums/albums.facade';
import { ToastrService } from 'ngx-toastr';

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
export class AlbumsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private readonly usersFacade: UsersFacade = inject(UsersFacade);
  private readonly albumsFacade: AlbumsFacade = inject(AlbumsFacade);

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
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.subscription.add(
      this.usersFacade.error$.subscribe((error: string | null) => {
        if (error) {
          this.toastr.error(error);
        }
      })
    );
    this.subscription.add(
      this.usersFacade.users$.subscribe((users: User[]) => {
        this.users = users;
      })
    );
    this.subscription.add(
      this.albumsFacade.error$.subscribe((error: string | null) => {
        if (error) {
          this.toastr.error(error);
        }
      })
    );
    this.subscription.add(
      this.albumsFacade.albumsRes$.subscribe((albumsRes: AlbumsRes | null) => {
        if (albumsRes) {
          this.albumsRes = albumsRes;
          this.currentPage = albumsRes.currentPage;
          this.lastPage = albumsRes.lastPage;
          this.itemsPerPage = albumsRes.perPage;
        }
      })
    );
    this.usersFacade.users$.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();

    this.route.queryParams.subscribe(params => {
      this.loadAlbums(params);
    });

    this.searchInput.pipe(debounceTime(500)).subscribe(value => {
      this.applySearch(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  loadAlbums({ page, limit, search, userId }: QueryLocalParams): void {
    this.spinner.show();

    const queryParams: QueryParams = {
      _page: page || this.currentPage,
      _limit: limit || this.itemsPerPage
    };

    if (search) queryParams['title_like'] = search; // search by title
    if (userId) queryParams['userId'] = userId; // filter by userId

    this.albumsFacade.loadAlbums(queryParams);

    this.searchText = search || '';
    this.selectedUserId = userId || '';
  }

  findUserById(userId: number): User | null {
    return this.users.find((item: User) => item.id === userId) || null;
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
