import { Component } from '@angular/core';

import { NgFor, KeyValuePipe } from '@angular/common';

import { HabitSelectService } from '../habit-select.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  habits: Map<String, boolean>;

  constructor(selector: HabitSelectService) {
    this.habits = selector.habits;
  }

  flip(key: String) {
    this.habits.set(key, !this.habits.get(key));
  }
}
