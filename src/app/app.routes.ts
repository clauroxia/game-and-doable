import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component')
  },
  {
    path: 'color-game',
    loadComponent: () => import('./color-game/color-game.component')
  },
  {
    path: 'doable',
    loadComponent: () => import('./doable/doable.component')
  },
];
