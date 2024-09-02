import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { HabitService, Habit, HabitDate } from '../../services/habit.service';


@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [
    MatDatepickerModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule, MatInputModule,
    MatFormFieldModule, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, MatCheckboxModule,
    MatButtonModule
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
              showDescription: false,
              selected: false,
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
      this.getFormValues(dateString);
    }
  }

  handleToggle(event: MatButtonToggleChange): void {
    if (event.value === "today") {
      this.getFormValues(this.today);
      this.dateController.setValue(new Date());
    }
  }

  handleSubmit(): void {
    for (let i: number = 0; i < this.formValues.length; i++) {
      let requests = 0;
      if (this.formValues[i].selected && this.dateController.value) {
        this.formValuesLoaded = false;
        requests++;
        const dateString = this.habitService.getDateString(this.dateController.value);
        this.habitService.setValue(this.formValues[i].name, dateString, true).subscribe({
          next: () => {
            this.formValues[i].value = 1;
            this.formValues[i].selected = false;
            requests--;
            // this might technically be a race condition
            if (requests === 0) {
              this.formValuesLoaded = true;
            }
          }
        })
      }
    }
  }
}

type HabitFormValue = {
  name: string;
  description: string;
  showDescription: boolean;
  selected: boolean;
  enabled: boolean;
  value: number | null;
}
