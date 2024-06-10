import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
          [isActive]="isActive"
          [isDisabled]="isActive"
          (clicked)="showForm()"
          routerLink="login"
        />
        <app-button
          textButton="Signup"
          [buttonDoable]="doable"
          [isActive]="!isActive"
          [isDisabled]="!isActive"
          (clicked)="showForm()"
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

  constructor() {
    effect(() => console.log(this.authService.state()));
  }

  showForm() {
    this.isActive = !this.isActive;
  }
}
