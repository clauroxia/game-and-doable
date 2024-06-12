import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterModule],
  template: `
    <div class="container-auth">
      <div class="frame-button">
        <app-button
          textButton="Login"
          [buttonDoable]="doable"
          [isActive]="router.url === '/doable/login' ? true : false"
          [isDisabled]="router.url === '/doable/login' ? true : false"
          routerLink="login"
        />
        <app-button
          textButton="Signup"
          [buttonDoable]="doable"
          [isActive]="router.url === '/doable/signup' ? true : false"
          [isDisabled]="router.url === '/doable/signup' ? true : false"
          routerLink="signup"
        />
      </div>
      <router-outlet />
    </div>
  `,
  styleUrl: './unauthenticated.component.css',
})
export class UnauthenticatedComponent {
  doable = true;
  isActive = true;
  authService = inject(AuthService);
  router = inject(Router)

  constructor() {
    effect(() => console.log(this.authService.state()));
  }
}
