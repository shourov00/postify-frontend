import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgSwitch } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbPagination,
  NgbPaginationEllipsis,
  NgbPaginationFirst,
  NgbPaginationLast,
  NgbPaginationNext,
  NgbPaginationNumber,
  NgbPaginationPrevious
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    NgSwitch,
    FormsModule,
    NgbPagination,
    NgbPaginationFirst,
    NgbPaginationLast,
    NgbPaginationPrevious,
    NgbPaginationNext,
    NgbPaginationEllipsis,
    NgbPaginationNumber
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input()
  currentPage: number = 1;

  @Input()
  lastPage: number = 1;

  @Input()
  itemsPerPage: number = 10;

  @Output() newPageNumber = new EventEmitter<number>();

  constructor() {}

  handlePageChange(page: number): void {
    this.newPageNumber.emit(page);
  }
}
