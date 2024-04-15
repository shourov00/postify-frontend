import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeCardComponent } from './welcome-card.component';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('WelcomeCardComponent', () => {
  let component: WelcomeCardComponent;
  let fixture: ComponentFixture<WelcomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the welcome card content', () => {
    const element: HTMLElement = fixture.nativeElement;
    const heading = element.querySelector('h2');
    const button = element.querySelector('button');

    expect(heading?.textContent).toContain('Hello Admin!');
    expect(button?.textContent).toContain('Write new post');
  });

  it('should render the welcome banner image on larger screens', () => {
    const element: HTMLElement = fixture.nativeElement;
    const welcomeBannerImage = element.querySelector('.welcome-banner-image');

    expect(welcomeBannerImage).toBeTruthy();
  });
});
