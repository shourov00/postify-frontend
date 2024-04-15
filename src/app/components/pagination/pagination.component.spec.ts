import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { PaginationComponent } from './pagination.component';
import { CoreFacade } from '@store/core/core.facade';
import { BehaviorSubject } from 'rxjs';
import { ScreenModeResolution } from '@store/core/models/core.models';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        {
          provide: CoreFacade,
          useValue: { mode$: new BehaviorSubject<ScreenModeResolution>(ScreenModeResolution.Large) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
