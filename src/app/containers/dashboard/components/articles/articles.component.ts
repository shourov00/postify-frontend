import { Component, inject } from '@angular/core';
import { Post } from '@services/post/post.model';
import { AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { KiloMegaPipe } from '../../../../shared/pipe/mega.pipe';
import { RouterLink } from '@angular/router';
import { PostsFacade } from '@store/posts/posts.facade';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [NgIf, NgForOf, DecimalPipe, DatePipe, KiloMegaPipe, RouterLink, AsyncPipe],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
  readonly postsFacade: PostsFacade = inject(PostsFacade);

  constructor(private toastr: ToastrService) {
    this.postsFacade.error$.subscribe((error: string | null) => {
      if (error) {
        this.toastr.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.postsFacade.loadPosts({ _page: 1, _limit: 10 });
  }

  trackByPost(index: number, item: Post): number {
    return item.id;
  }
}
