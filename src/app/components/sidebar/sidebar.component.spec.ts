import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {provideRouter, Router} from "@angular/router";
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default app version', () => {
    expect(component.appVersion).toEqual('1.0.0');
  });

  it('should have a default menu', () => {
    expect(component.menuApp).toBeDefined();
    expect(component.menuApp.length).toBeGreaterThan(0);
  });

  it('should set isLinkActive to true for the current active link', () => {
    Object.defineProperty(router, 'url', { get: () => '/' });

    const isActive = component.isLinkActive('/');
    expect(isActive).toBe(true);
  });

  it('should set isLinkActive to false for a non-active link', () => {
    Object.defineProperty(router, 'url', { get: () => '/' });

    const isActive = component.isLinkActive('/demo');
    expect(isActive).toBe(false);
  });
});
