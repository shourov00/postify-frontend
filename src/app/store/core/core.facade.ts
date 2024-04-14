import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, ScreenModeResolution } from '@store/core/models/core.models';
import { selectScreenModeResolution } from '@store/core/core.selectors';
import { updateScreenModeResolution } from '@store/core/core.actions';

@Injectable({ providedIn: 'root' })
export class CoreFacade {
  private readonly store: Store<AppState> = inject(Store);

  readonly mode$: Observable<ScreenModeResolution> = this.store.select(selectScreenModeResolution);

  updateScreenMode(mode: ScreenModeResolution): void {
    this.store.dispatch(updateScreenModeResolution({ mode }));
  }
}
