import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button
      [type]="type"
      [ngClass]="{
        button: true,
        'button--outline': buttonOutline,
        'button--doable': buttonDoable,
        'button--secondary': buttonSecondary,
        'button--sm': buttonSm,
        'button--icon': buttonIcon,
      }"
      [disabled]="isDisabled"
      [routerLinkActive]="isActive ? 'is-active' : ''"
      (click)="handleClick()"
    >
      {{ textButton }}
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() textButton!: string;
  @Input() buttonOutline: boolean = false;
  @Input() buttonDoable: boolean = false;
  @Input() buttonSecondary: boolean = false;
  @Input() buttonSm: boolean = false;
  @Input() buttonIcon: boolean = false;
  @Input() isActive: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() type: string = 'button';
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
