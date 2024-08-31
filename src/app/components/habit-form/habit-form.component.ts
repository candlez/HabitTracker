import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

import { HabitService, Habit } from '../../services/habit.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';


@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [MatDatepickerModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule, MatInputModule,
    MatFormFieldModule, NgIf
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent implements OnInit {
  habits!: Habit[];
  habitsLoaded: boolean = false;

  toggleController: FormControl<string | null> = new FormControl<string | null>("today");

  today!: string;
  dateController: FormControl<Date | null> = new FormControl<Date | null>(new Date());

  constructor(public habitService: HabitService) {

  }

  ngOnInit(): void {
    this.habitService.getHabits().subscribe({
      next: (habits: Habit[]) => {
        this.habits = [];
        for (let i: number = 0; i < habits.length; i++) {
          if (habits[i].enabled) {
            this.habits.push(habits[i]);
          }
        }
        if (this.habits.length === 0) {
          // same as 404
        }
        this.habitsLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // see above
        } else {
          // generic error
        }
      }
    });
  }

  handleDateSelect(event: MatDatepickerInputEvent<Date>): void {

  }
}
