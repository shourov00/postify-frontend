import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CoreFacade } from '@store/core/core.facade';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { screenModeFromWidth } from '@utils/screen-size-utils';
import { ScreenModeResolution } from '@store/core/models/core.models';
import { RouterTestingHarness } from '@angular/router/testing';

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
      imports: [RouterTestingHarness],
      declarations: [AppComponent, HeaderComponent, SidebarComponent],
      providers: [
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
    const spyOnUpdateScreenMode = jest.spyOn(mockCoreFacade, 'updateScreenMode');
    const mockWidth = 1000;
    const mockMode = ScreenModeResolution.Large;
    jest.spyOn(window, 'innerWidth', 'get').mockReturnValue(mockWidth);
    // @ts-ignore
    jest.spyOn(screenModeFromWidth, 'screenModeFromWidth').mockReturnValue(mockMode);

    window.dispatchEvent(new Event('resize'));

    expect(spyOnUpdateScreenMode).toHaveBeenCalledWith(mockMode);
  });

  it('should update isCollapse value when setCollapse is called', () => {
    component.setCollapse(true);
    expect(component.isCollapse).toBe(true);
  });
});
