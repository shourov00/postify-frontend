import { Component, HostListener, inject } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
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

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.coreFacade.mode$.subscribe((mode: ScreenModeResolution) => (this.mode = mode));

    this.router.events.subscribe((event): void => {
      if (event instanceof RouteConfigLoadStart) {
        this.spinner.show();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinner.hide();
      }
    });
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
