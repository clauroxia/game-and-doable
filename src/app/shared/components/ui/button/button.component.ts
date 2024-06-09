import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [ngClass]="{
        button: true,
        'button--outline': buttonOutline,
        'button--doable': buttonDoable,
        'button--secondary': buttonSecondary,
        'button--sm': buttonSm,
        'is-active': isActive,
      }"
      [disabled]="isDisabled"
      (click)="handleClick()"
    >
      {{ textButton }}
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
  @Input() isActive: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() type: string = 'button';
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
