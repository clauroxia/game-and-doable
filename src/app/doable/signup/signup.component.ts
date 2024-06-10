import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
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
      <app-button textButton="Create" type="submit" />
    </form>
  `,
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
      this.authService.signup$.next(this.form.getRawValue());
    } else {
      console.log('Formulario no válido');
    }
  }
}
