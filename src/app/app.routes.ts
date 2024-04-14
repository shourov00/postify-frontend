import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'posts',
    loadComponent: () => import('./containers/posts/posts.component').then(c => c.PostsComponent)
  },
  {
    path: 'albums',
    loadComponent: () => import('./containers/albums/albums.component').then(c => c.AlbumsComponent)
  },
  {
    path: 'photos',
    loadComponent: () => import('./containers/photos/photos.component').then(c => c.PhotosComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./containers/users/users.component').then(c => c.UsersComponent)
  }
];
