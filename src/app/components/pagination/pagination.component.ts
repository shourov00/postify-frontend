import { Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
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
import { environment } from '@env/environment';
import { ScreenModeResolution } from '@store/core/models/core.models';
import { CoreFacade } from '@store/core/core.facade';

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
export class PaginationComponent implements OnInit {
  private readonly coreFacade: CoreFacade = inject(CoreFacade);

  @Input()
  currentPage: number = 1;

  @Input()
  lastPage: number = 1;

  @Input()
  itemsPerPage: number = environment.elementsPerPage;

  @Output() newPageNumber = new EventEmitter<number>();

  mode?: ScreenModeResolution;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.coreFacade.mode$.subscribe((mode: ScreenModeResolution) => (this.mode = mode));
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  handlePageChange(page: number): void {
    this.newPageNumber.emit(page);
  }

  protected readonly ScreenModeResolution = ScreenModeResolution;
}
