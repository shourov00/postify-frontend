import { Component, Input } from '@angular/core';
import { Breadcrumb } from './breadcrumbs.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  @Input()
  breadcrumbs: Breadcrumb[] = [];

  constructor() {}

  trackByLink(index: number, item: Breadcrumb): string {
    return item.link;
  }
}
