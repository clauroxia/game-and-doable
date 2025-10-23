import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'color-game',
    loadComponent: () =>
      import('./color-game/color-game.component').then(
        (m) => m.ColorGameComponent
      ),
  },
  {
    path: 'doable',
    loadComponent: () =>
      import('./doable/doable.component').then((m) => m.DoableComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./doable/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./doable/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
      },
    ],
  },
];
