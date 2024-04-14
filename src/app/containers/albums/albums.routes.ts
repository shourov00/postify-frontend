import { Routes } from '@angular/router';

export const AlbumsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./albums.component').then(c => c.AlbumsComponent)
  },
  {
    path: ':id', // albumId
    loadComponent: () => import('./pages/album/album.component').then(c => c.AlbumComponent)
  }
];
