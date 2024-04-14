import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PhotosComponent } from './components/photos/photos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    WelcomeCardComponent,
    ArticlesComponent,
    StatisticsComponent,
    PhotosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor() {}
}
