import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PhotosComponent } from './components/photos/photos.component';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { ToastrModule } from 'ngx-toastr';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        WelcomeCardComponent,
        ArticlesComponent,
        StatisticsComponent,
        PhotosComponent,
        ToastrModule.forRoot()
      ],
      providers: [
        provideMockStore({
          initialState: {}
        })
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain WelcomeCardComponent', () => {
    const welcomeCardComponent = fixture.nativeElement.querySelector('app-welcome-card');
    expect(welcomeCardComponent).toBeTruthy();
  });

  it('should contain ArticlesComponent', () => {
    const articlesComponent = fixture.nativeElement.querySelector('app-articles');
    expect(articlesComponent).toBeTruthy();
  });

  it('should contain StatisticsComponent', () => {
    const statisticsComponent = fixture.nativeElement.querySelector('app-statistics');
    expect(statisticsComponent).toBeTruthy();
  });

  it('should contain PhotosComponent', () => {
    const photosComponent = fixture.nativeElement.querySelector('app-photos');
    expect(photosComponent).toBeTruthy();
  });
});
