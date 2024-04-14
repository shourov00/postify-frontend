import { Routes } from '@angular/router';

export const PhotosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./photos.component').then(c => c.PhotosComponent)
  },
  {
    path: ':id', // photoId
    loadComponent: () => import('./pages/photo/photo.component').then(c => c.PhotoComponent)
  }
];
