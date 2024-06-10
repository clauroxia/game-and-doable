import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
      <div class="group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="user@example.com"
          formControlName="email"
        />
      </div>
      <div class="group">
        <label for="password">Password</label>
        <input id="password" type="password" formControlName="password" />
      </div>
      <p *ngIf="authService.error()" class="error-message">{{authService.error()}}</p>
      <app-button textButton="Enter" type="submit" />
    </form>
  `,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['clau@mail.com', Validators.required],
    password: ['123456', Validators.required],
  });

  constructor() {
    this.authService.resetError();
  }

  onSubmit() {
    console.log(this.form.getRawValue());
    this.authService.login$.next(this.form.getRawValue());
  }
}
