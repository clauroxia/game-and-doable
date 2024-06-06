import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/ui/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  template: `
    <div class="wrapper">
      <img src="assets/angular.svg" width="96" />
      <h1 class="title">React Evaluation</h1>
      <p class="name">Claudia Berríos</p>
      <div class="buttons">
        <app-button
          textButton="Color Game"
          routerLink="color-game"
          [buttonOutline]="outline"
        />
        <app-button
          textButton="Doable"
          routerLink="doable"
          [buttonOutline]="outline"
        />
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export default class HomeComponent {
  outline: boolean = true;
}
