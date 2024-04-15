import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CoreFacade } from '@store/core/core.facade';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ScreenModeResolution } from '@store/core/models/core.models';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockCoreFacade: Partial<CoreFacade>;
  let mockStore: Partial<Store>;

  beforeEach(async () => {
    mockCoreFacade = {
      mode$: of(ScreenModeResolution.Large),
      updateScreenMode: jest.fn()
    };

    mockStore = {};

    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, SidebarComponent],
      providers: [
        provideRouter([]),
        { provide: CoreFacade, useValue: mockCoreFacade },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isCollapse set to false', () => {
    expect(component.isCollapse).toBe(false);
  });

  it('should update screen mode when window is resized', () => {
    const mockMode = ScreenModeResolution.Large;
    const mockWidth = 1000;
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(mockWidth);

    window.dispatchEvent(new Event('resize'));
    jest.spyOn(component, 'onWindowResize').mockImplementation(() => {
      component.onWindowResize();
      expect(mockCoreFacade.updateScreenMode).toHaveBeenCalledWith(mockMode);
    });
  });


  it('should update isCollapse value when setCollapse is called', () => {
    component.setCollapse(true);
    expect(component.isCollapse).toBe(true);
  });
});
