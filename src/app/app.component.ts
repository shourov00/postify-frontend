import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScreenModeResolution } from '@store/core/models/core.models';
import { screenModeFromWidth } from '@utils/screen-size-utils';
import { CoreFacade } from '@store/core/core.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly coreFacade: CoreFacade = inject(CoreFacade);

  title = 'Postify';

  private mode?: ScreenModeResolution;

  isCollapse: boolean = false;

  constructor() {
    this.coreFacade.mode$.subscribe((mode: ScreenModeResolution) => (this.mode = mode));
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    const newMode = screenModeFromWidth(window.innerWidth);
    if (newMode !== this.mode) {
      this.coreFacade.updateScreenMode(newMode);
    }
  }

  setCollapse(value: boolean): void {
    this.isCollapse = value;
  }
}
