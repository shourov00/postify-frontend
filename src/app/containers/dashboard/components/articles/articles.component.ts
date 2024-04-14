import { Component, Input } from '@angular/core';
import { Post } from '@services/post/post.model';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { KiloMegaPipe } from '../../../../shared/pipe/mega.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [NgIf, NgForOf, DecimalPipe, DatePipe, KiloMegaPipe, RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
  @Input()
  public posts: Post[] = [];

  constructor() {}

  trackByPost(index: number, item: Post): number {
    return item.id;
  }
}
