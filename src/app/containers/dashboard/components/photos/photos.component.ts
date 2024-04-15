import { Component, inject, OnInit } from '@angular/core';
import { Photo } from '@services/photo/photo.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PhotosFacade } from '@store/photos/photos.facade';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink, AsyncPipe],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {
  readonly photosFacade: PhotosFacade = inject(PhotosFacade);

  constructor(private toastr: ToastrService) {
    this.photosFacade.error$.subscribe((error: string | null) => {
      if (error) {
        this.toastr.error(error);
      }
    });
  }

  ngOnInit() {
    this.photosFacade.loadPhotos({ _page: 1, _limit: 20 });
  }

  trackByPhoto(index: number, item: Photo): number {
    return item.id;
  }
}
