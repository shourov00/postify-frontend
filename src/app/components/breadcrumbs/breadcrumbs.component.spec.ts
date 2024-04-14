import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { provideRouter } from '@angular/router';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
