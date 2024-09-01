import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import { HabitService, Habit, HabitDate } from '../../services/habit.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';


@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [MatDatepickerModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule, MatInputModule,
    MatFormFieldModule, NgIf, NgFor
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent implements OnInit {
  formValues!: HabitFormValue[];
  formValuesLoaded: boolean = false;

  habits!: Habit[];
  habitsLoaded: boolean = false;

  toggleController: FormControl<string | null> = new FormControl<string | null>("today");

  today!: string;
  dateController: FormControl<Date | null> = new FormControl<Date | null>(new Date());

  constructor(public habitService: HabitService) {

  }

  ngOnInit(): void {
    this.today = this.habitService.getDateString(new Date());

    this.habitService.getHabits().subscribe({
      next: (habits: Habit[]) => {
        this.habits = habits;
        this.getFormValues(this.today);
        this.habitsLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // no habits???
        } else {
          // generic error
        }
        this.habitsLoaded = true;
      }
    });
  }

  getFormValues(date: string) {
    this.formValuesLoaded = false;
    this.formValues = [];
    this.habitService.getDate(date).subscribe({
      next: (value: HabitDate) => {
        for (let i: number = 0; i < this.habits.length; i++) {
          const habit: Habit = this.habits[i];
          if (this.toggleController.value === "backfill" || habit.enabled) {
            this.formValues.push({
              name: habit.name,
              description: habit.description,
              enabled: value[habit.name] !== null,
              value: value[habit.name]
            });
          }
        }

        if (this.formValues.length === 0) {
          // no habits error handling (see below)
        } else {
          this.formValuesLoaded = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // no data for this date
        } else {
          // unexpected error
        }
        this.formValuesLoaded = true;
      }
    });
  }

  handleDateSelect(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const dateString = this.habitService.getDateString(event.value);
    }
  }
}

interface HabitFormValue {
  name: string;
  description: string;
  enabled: boolean;
  value: boolean | null;
}
