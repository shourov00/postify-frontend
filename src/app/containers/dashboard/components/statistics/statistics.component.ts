import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { PostsFacade } from '@store/posts/posts.facade';
import { AlbumsFacade } from '@store/albums/albums.facade';
import { ToastrService } from 'ngx-toastr';
import { PhotosFacade } from '@store/photos/photos.facade';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [DecimalPipe, AsyncPipe],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  readonly postsFacade: PostsFacade = inject(PostsFacade);
  readonly albumsFacade: AlbumsFacade = inject(AlbumsFacade);
  readonly photosFacade: PhotosFacade = inject(PhotosFacade);

  constructor(private toastr: ToastrService) {
    this.albumsFacade.error$.subscribe((error: string | null) => {
      if (error) {
        this.toastr.error(error);
      }
    });
  }

  ngOnInit() {
    this.albumsFacade.loadAlbums({ _page: 1, _limit: 10 });
  }
}
