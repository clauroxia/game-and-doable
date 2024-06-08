import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [ngClass]="{ button: true, 'button--outline': buttonOutline }" (click)="handleClick()">
      {{ textButton }}
    </button>
  `,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() textButton!: string;
  @Input() buttonOutline: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
