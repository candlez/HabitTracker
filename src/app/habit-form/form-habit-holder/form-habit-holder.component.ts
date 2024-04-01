import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

import { Habit } from '../../data.service';


@Component({
  selector: 'app-form-habit-holder',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-habit-holder.component.html',
  styleUrl: './form-habit-holder.component.css'
})
export class FormHabitHolderComponent {
  @Input() habit!: Habit;
  @Output() checked = new EventEmitter<number>();
  @Output() undone = new EventEmitter<any>();

  status: number;

  constructor() {
    this.status = 0;
  }

  toggleStatus() {
    if (this.status) {
      this.status = 0;
    } else {
      this.status = 1;
    }
  }
}
