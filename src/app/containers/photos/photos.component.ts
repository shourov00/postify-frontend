import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.model';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QueryLocalParams, QueryParams } from '@services/api/api.model';
import { debounceTime } from 'rxjs/operators';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { Photo, PhotosRes } from '@services/photo/photo.model';
import { PhotosFacade } from '@store/photos/photos.facade';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photos',
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
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  private readonly photosFacade: PhotosFacade = inject(PhotosFacade);

  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Photos',
      link: '/photos',
      isActive: true
    }
  ];

  // DATA
  photosRes?: PhotosRes;

  // PAGINATION
  currentPage: number = 1;
  lastPage: number = 1;
  itemsPerPage: number = 20;

  // SEARCHING
  searchText: string = '';
  searchInput: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.subscription.add(
      this.photosFacade.error$.subscribe((error: string | null) => {
        if (error) {
          this.toastr.error(error);
        }
      })
    );
    this.subscription.add(
      this.photosFacade.photosRes$.subscribe((photosRes: PhotosRes | null) => {
        if (photosRes) {
          this.photosRes = photosRes;
          this.currentPage = photosRes.currentPage;
          this.lastPage = photosRes.lastPage;
          this.itemsPerPage = photosRes.perPage;
        }
      })
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loadPhotos(params);
    });

    this.searchInput.pipe(debounceTime(500)).subscribe(value => {
      this.applySearch(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  queryPhotos({ page, limit, search }: QueryLocalParams): void {
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

  loadPhotos({ page, limit, search }: QueryLocalParams): void {
    this.spinner.show();

    const queryParams: QueryParams = {
      _page: page || this.currentPage,
      _limit: limit || this.itemsPerPage
    };

    if (search) queryParams['title_like'] = search; // search by title

    this.photosFacade.loadPhotos(queryParams);

    this.searchText = search || '';
  }

  applySearch(search: string): void {
    this.queryPhotos({
      search
    });
  }

  onSearchInput(value: string): void {
    this.searchText = value;
    this.searchInput.next(value.trim());
  }

  onItemsPerPageSelected(value: number): void {
    this.queryPhotos({
      limit: value
    });
  }

  onPageChange(pageNumber: number): void {
    this.queryPhotos({
      page: pageNumber
    });
  }

  trackByPhoto(index: number, item: Photo): number {
    return item.id;
  }
}
