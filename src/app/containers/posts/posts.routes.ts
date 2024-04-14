import { Routes } from '@angular/router';

export const PostsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./posts.component').then(c => c.PostsComponent)
  },
  {
    path: ':id', // postId
    loadComponent: () => import('./pages/post/post.component').then(c => c.PostComponent)
  }
];
