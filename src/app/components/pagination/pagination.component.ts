import {Component, EventEmitter, HostListener, Inject, Input, OnInit, Output} from '@angular/core';
import { DOCUMENT, NgClass, NgForOf, NgIf, NgSwitch } from '@angular/common';
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
export class PaginationComponent implements OnInit{
  @Input()
  currentPage: number = 1;

  @Input()
  lastPage: number = 1;

  @Input()
  itemsPerPage: number = 10;

  @Output() newPageNumber = new EventEmitter<number>();

  isMobile: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

 ngOnInit() {
   const screenWidth = this.document.documentElement.clientWidth;
   this.isMobile = screenWidth <= 768;
 }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = (event.target as Window).innerWidth < 768;
  }

  handlePageChange(page: number): void {
    this.newPageNumber.emit(page);
  }
}
