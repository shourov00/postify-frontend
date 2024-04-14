import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Postify | Dashboard',
    loadComponent: () => import('./containers/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'posts',
    title: 'Postify | Posts',
    loadChildren: () => import('./containers/posts/posts.routes').then(routes => routes.PostsRoutes)
  },
  {
    path: 'albums',
    title: 'Postify | Albums',
    loadChildren: () => import('./containers/albums/albums.routes').then(routes => routes.AlbumsRoutes),
  },
  {
    path: 'photos',
    title: 'Postify | Photos',
    loadChildren: () => import('./containers/photos/photos.routes').then(routes => routes.PhotosRoutes),
  },
  {
    path: 'users',
    title: 'Postify | Users',
    loadChildren: () => import('./containers/users/users.routes').then(routes => routes.UsersRoutes),
  }
];
