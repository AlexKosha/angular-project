import { Routes } from '@angular/router';
import { Category } from './components/category/category';
import { Preparation } from './components/preparation/preparation';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Home } from './components/home/home';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'categories/:categoryId', component: Category, canActivate: [authGuard] },
  { path: 'preparation', component: Preparation, canActivate: [authGuard] },
  { path: '**', component: PageNotFound },
];
