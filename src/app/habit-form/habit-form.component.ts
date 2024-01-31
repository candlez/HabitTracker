import { Component } from '@angular/core';

import { SubmitButtonBarComponent } from '../submit-button-bar/submit-button-bar.component';
import { FormComponent } from '../form/form.component';
import { ButtonCounterComponent } from '../button-counter/button-counter.component';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [SubmitButtonBarComponent, FormComponent, ButtonCounterComponent],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent {

}
