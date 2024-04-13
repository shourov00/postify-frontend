import { Component, Input } from '@angular/core';
import { Photo } from '@services/photo/photo.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent {
  @Input()
  public photos: Photo[] = [];

  constructor() {}

  trackByPhoto(index: number, item: Photo): number {
    return item.id;
  }
}
