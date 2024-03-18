import { Component } from '@angular/core';

import { SubmitButtonBarComponent } from './submit-button-bar/submit-button-bar.component';
import { FormComponent } from './form/form.component';
import { ButtonCounterComponent } from '../button-counter/button-counter.component';

import { HabitSelectService } from './habit-select.service';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [SubmitButtonBarComponent, FormComponent, ButtonCounterComponent],
  providers: [HabitSelectService],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent {
  selector: HabitSelectService;

  constructor(selector: HabitSelectService) {
    this.selector = selector;
  }
}
