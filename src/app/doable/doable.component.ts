import { Component, inject } from '@angular/core';
import { AuthenticatedComponent } from './ui/authenticated/authenticated.component';
import { UnauthenticatedComponent } from './ui/unauthenticated/unauthenticated.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-doable',
  standalone: true,
  imports: [AuthenticatedComponent, UnauthenticatedComponent],
  template: `
    <div class="wrapper">
      <h1 class="title">Doable</h1>
      <p class="description">Add and filter your most important tasks</p>
      @if (authService.currentUser()) {
      <app-authenticated />
      } @else {
      <app-unauthenticated />
      }
    </div>
  `,
  styleUrl: './doable.component.css',
})
export default class DoableComponent {
  authService = inject(AuthService);
}
