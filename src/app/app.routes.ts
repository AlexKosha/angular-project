import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'categories/:categoryId',
    loadComponent: () => import('./components/category/category').then((m) => m.Category),
    canActivate: [authGuard],
  },
  {
    path: 'preparation',
    loadComponent: () => import('./components/preparation/preparation').then((m) => m.Preparation),
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFound },
];
