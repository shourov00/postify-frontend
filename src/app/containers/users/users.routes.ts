import { Routes } from '@angular/router';

export const UsersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./users.component').then(c => c.UsersComponent)
  },
  {
    path: ':id', // userId
    loadComponent: () => import('./pages/user/user.component').then(c => c.UserComponent)
  }
];
