import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { SearchFiltersComponent } from '../../../../components/search-filters/search-filters.component';
import { Breadcrumb } from '../../../../components/breadcrumbs/breadcrumbs.model';
import { PhotoService } from '@services/photo/photo.service';
import { User } from '@services/user/user.model';
import { Photo } from '@services/photo/photo.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [BreadcrumbsComponent, NgForOf, NgIf, PaginationComponent, RouterLink, SearchFiltersComponent],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent implements OnInit {
  public breadcrumbs: Breadcrumb[] = [
    {
      title: 'Photos',
      link: '/photos'
    }
  ];

  id?: string;
  photo?: Photo;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.breadcrumbs.push({
      title: 'Photo details',
      link: `/photos/${this.id}`,
      isActive: true
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.spinner.show();
      this.photoService.getPhotoDetails(this.id).subscribe((photo: Photo) => {
        this.photo = photo;
        this.spinner.hide();
      });
    }
  }
}
