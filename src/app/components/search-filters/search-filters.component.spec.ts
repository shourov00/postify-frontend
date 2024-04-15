import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersComponent } from './search-filters.component';
import { FormsModule } from '@angular/forms';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new items per page value when onItemsPerPageSelected is called', () => {
    jest.spyOn(component.newItemsPerPage, 'emit');
    component.itemsPerPage = 20;
    component.onItemsPerPageSelected();
    expect(component.newItemsPerPage.emit).toHaveBeenCalledWith(20);
  });

  it('should emit new search input value when onSearchInput is called', () => {
    jest.spyOn(component.newSearchInput, 'emit');
    const event = { target: { value: 'test search' } } as unknown as Event;
    component.onSearchInput(event);
    expect(component.newSearchInput.emit).toHaveBeenCalledWith('test search');
  });

  it('should emit empty search input value when clearSearch is called', () => {
    jest.spyOn(component.newSearchInput, 'emit');
    component.searchText = 'test search';
    component.clearSearch();
    expect(component.newSearchInput.emit).toHaveBeenCalledWith('');
  });

  it('should emit new user selected value when onUserSelected is called', () => {
    jest.spyOn(component.newUserSelected, 'emit');
    component.selectedUserId = '123';
    component.onUserSelected();
    expect(component.newUserSelected.emit).toHaveBeenCalledWith('123');
  });

  it('should emit empty user selected value when clearFilter is called', () => {
    jest.spyOn(component.newUserSelected, 'emit');
    component.clearFilter();
    expect(component.newUserSelected.emit).toHaveBeenCalledWith('');
  });
});
