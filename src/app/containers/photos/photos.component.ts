import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.model';
import { Subject } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QueryLocalParams, QueryParams } from '@services/api/api.model';
import { debounceTime } from 'rxjs/operators';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { Photo, PhotosRes } from '@services/photo/photo.model';
import { PhotoService } from '@services/photo/photo.service';

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
export class PhotosComponent implements OnInit {
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
    private photoService: PhotoService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loadPhotos(params);
    });

    this.searchInput.pipe(debounceTime(500)).subscribe(value => {
      this.applySearch(value);
    });
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

  loadPhotos({ page, limit, search }: QueryLocalParams): void {
    this.spinner.show();

    const queryParams: QueryParams = {
      _page: page || this.currentPage,
      _limit: limit || this.itemsPerPage
    };

    if (search) queryParams['title_like'] = search; // search by title

    this.photoService.getPhotos(queryParams).subscribe((photosRes: PhotosRes) => {
      console.log(photosRes);
      this.photosRes = photosRes;
      this.currentPage = photosRes.currentPage;
      this.lastPage = photosRes.lastPage;
      this.itemsPerPage = photosRes.perPage;
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
