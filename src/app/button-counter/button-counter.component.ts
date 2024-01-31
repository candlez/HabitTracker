import { Component } from '@angular/core';

@Component({
  selector: 'app-button-counter',
  standalone: true,
  imports: [],
  templateUrl: './button-counter.component.html',
  styleUrl: './button-counter.component.css'
})
export class ButtonCounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
