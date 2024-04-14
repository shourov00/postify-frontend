import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from '@store/core/core.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from '@store/users/users.effects';
import { provideToastr } from 'ngx-toastr';
import { PostsEffects } from '@store/posts/posts.effects';
import { AlbumsEffects } from '@store/albums/albums.effects';
import { PhotosEffects } from '@store/photos/photos.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'square-jelly-box' })),
    provideAnimations(),
    provideStore(reducers),
    provideEffects(UsersEffects, PostsEffects, AlbumsEffects, PhotosEffects),
    provideToastr(),
    provideStoreDevtools({ maxAge: 25, logOnly: isDevMode() })
  ]
};
