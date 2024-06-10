import { Routes } from '@angular/router';
import { LoginComponent } from './doable/login/login.component';
import { SignupComponent } from './doable/signup/signup.component';


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
    loadComponent: () => import('./doable/doable.component'),
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
    ]
  },
];
