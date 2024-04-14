import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { User } from '@services/user/user.model';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss'
})
export class SearchFiltersComponent {
  @Input()
  users: User[] = [];

  @Input()
  searchText: string = '';

  @Input()
  isFilter: boolean = true;

  @Input()
  itemsPerPage: number = 10;

  @Input()
  selectedUserId: string = '';

  @Output()
  newItemsPerPage = new EventEmitter<number>();

  @Output()
  newSearchInput = new EventEmitter<string>();

  @Output()
  newUserSelected = new EventEmitter<string>();

  constructor() {}

  onItemsPerPageSelected(): void {
    this.newItemsPerPage.emit(this.itemsPerPage);
  }

  onSearchInput(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.newSearchInput.emit(searchValue.trim());
  }

  clearSearch(): void {
    this.newSearchInput.emit('');
  }

  onUserSelected(): void {
    this.newUserSelected.emit(this.selectedUserId);
  }

  clearFilter(): void {
    this.newUserSelected.emit('');
  }
}
