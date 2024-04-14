import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.model';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostsRes } from '@services/post/post.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { User } from '@services/user/user.model';
import { QueryLocalParams, QueryParams } from '@services/api/api.model';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { environment } from '@env/environment';
import { UsersFacade } from '@store/users/users.facade';
import { PostsFacade } from '@store/posts/posts.facade';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgClass,
    FormsModule,
    NgForOf,
    NgIf,
    NgxSpinnerModule,
    PaginationComponent,
    SearchFiltersComponent,
    RouterLink
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  readonly usersFacade: UsersFacade = inject(UsersFacade);
  private readonly postsFacade: PostsFacade = inject(PostsFacade);

  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Posts',
      link: '/posts',
      isActive: true
    }
  ];

  // DATA
  postsRes?: PostsRes;
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

  // SORTING
  sortedColumn: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      this.postsFacade.error$.subscribe((error: string | null) => {
        if (error) {
          this.toastr.error(error);
        }
      })
    );
    this.subscription.add(
      this.postsFacade.postsRes$.subscribe((postsRes: PostsRes | null) => {
        if (postsRes) {
          this.postsRes = postsRes;
          this.currentPage = postsRes.currentPage;
          this.lastPage = postsRes.lastPage;
          this.itemsPerPage = postsRes.perPage;
        }
      })
    );
  }

  ngOnInit(): void {
    this.usersFacade.loadUsers();

    this.route.queryParams.subscribe(params => {
      this.loadPosts(params);
    });

    this.searchInput.pipe(debounceTime(500)).subscribe(value => {
      this.applySearch(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  queryPosts({ page, limit, sortBy, search, order, userId }: QueryLocalParams): void {
    const queryParams: QueryLocalParams = {
      page: page || 1,
      limit: limit || this.itemsPerPage,
      search: search || this.searchText,
      sortBy: sortBy || this.sortedColumn,
      order: order || this.sortDirection,
      userId: userId || this.selectedUserId
    };

    // Clean query params
    Object.keys(queryParams).forEach(key => queryParams[key] == '' && delete queryParams[key]);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }

  loadPosts({ page, limit, search, userId, sortBy, order }: QueryLocalParams): void {
    const queryParams: QueryParams = {
      _page: page || this.currentPage,
      _limit: limit || this.itemsPerPage
    };

    if (search) queryParams['title_like'] = search; // search by title
    if (userId) queryParams['userId'] = userId; // filter by userId
    if (sortBy) queryParams['_sort'] = sortBy; // sort by column name
    if (order) queryParams['_order'] = order; // sort order asc | desc

    this.postsFacade.loadPosts(queryParams);

    this.searchText = search || '';
    this.selectedUserId = userId || '';
    this.sortedColumn = sortBy || 'id';
    this.sortDirection = (order as 'asc' | 'desc') || 'asc';
  }

  findUserById(userId: number): User | null {
    return this.users.find((item: User) => item.id === userId) || null;
  }

  applySearch(search: string): void {
    this.queryPosts({
      search
    });
  }

  toggleSort(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'desc';
    }

    this.queryPosts({
      sortBy: this.sortedColumn,
      order: this.sortDirection
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

  trackByPost(index: number, item: Post): number {
    return item.id;
  }
}
