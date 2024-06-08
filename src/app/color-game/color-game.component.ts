import { Component, OnInit } from '@angular/core';
import { getRandomColors, getStatus, rgbString } from './utils';
import { Color, Opacity, RgbTarget } from './interfaces';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../shared/components/ui/button/button.component';

@Component({
  selector: 'app-color-game',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="wrapper">
      <h1 class="title">Color Game</h1>
      <p class="description">
        Guess which color correspond to the following RGB code
      </p>

      <div class="rgb-wrapper">
        <div class="rgb" style="border-color: red;">
          <p class="color-number">{{ rgbTarget.r }}</p>
          <p>red</p>
        </div>
        <div class="rgb" style="border-color: green;">
          <p class="color-number">{{ rgbTarget.g }}</p>
          <p>green</p>
        </div>
        <div class="rgb" style="border-color: blue;">
          <p class="color-number">{{ rgbTarget.b }}</p>
          <p>blue</p>
        </div>
      </div>
      <div class="dashboard">
        <div class="number-input">
          <label for="colors"># Colors</label>
          <input
            id="colors"
            type="number"
            [value]="numOfColors"
            (change)="handleChangeNumber($event)"
            step="3"
            min="3"
            max="9"
          />
        </div>
        <p class="game-status">{{ statusMessages[status] }}</p>
        <app-button textButton="Reset" (clicked)="handleReset()" />
      </div>
      <div class="squares">
        @for (color of colors; track $index) {
        <button
          [ngStyle]="{
            'background-color': bgColor(rgbString(color).rgb),
            'opacity': buttonOpacity[$index]
          }"
          (click)="handleAttempt($index)"
          class="square"
          [disabled]="isDisabled"
        ></button>
        }
      </div>
    </div>
  `,
  styleUrl: './color-game.component.css',
})

export default class ColorGameComponent implements OnInit {
  rgbString = rgbString;
  buttonOpacity: Opacity[] = [];
  isDisabled = false;
  numOfColors = 6;
  statusMessages = {
    playing: 'The game is on!',
    win: 'You won!',
    lose: 'You lose!',
  };

  attempts!: number[];
  colors!: Color[];
  target!: number;
  status!: 'win' | 'lose' | 'playing';
  rgbTarget!: RgbTarget;

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.colors = getRandomColors(this.numOfColors);
    this.target = Math.floor(Math.random() * this.colors.length);
    this.attempts = [];
    this.status = getStatus(this.attempts, this.target, this.numOfColors);
    this.rgbTarget = rgbString(this.colors[this.target]);
    this.buttonOpacity = this.colors.map(() => '100');
  }

  handleChangeNumber(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.numOfColors = Number(inputElement.value);
    this.isDisabled = false;
    this.startGame();
  }

  handleReset() {
    this.isDisabled = false;
    this.startGame();
  }

  handleAttempt(i: number): void {
    if (!this.attempts.includes(i)) {
      this.attempts.push(i);
      this.buttonOpacity[i] = '0';
    }
    this.status = getStatus(this.attempts, this.target, this.numOfColors);
    this.isDisabled = (this.status === 'win' || this.status === 'lose') ?? true;
    // console.log(this.attempts);
  }

  bgColor(rgb: string) {
    if (this.status === 'win' || this.status === 'lose') {
      this.buttonOpacity = this.buttonOpacity.map(() => '100');
      return this.rgbTarget.rgb;
    } else {
      return rgb;
    }
  }
}
