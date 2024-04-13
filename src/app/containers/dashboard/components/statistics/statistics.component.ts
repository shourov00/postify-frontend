import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @Input()
  totalPosts: number = 0;

  @Input()
  totalAlbums: number = 0;

  @Input()
  totalPhotos: number = 0;
}
