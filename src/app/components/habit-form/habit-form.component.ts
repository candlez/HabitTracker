import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { HabitService, Habit, HabitDate } from '../../services/habit.service';
import { CreatorRedirectService } from '../../services/creator-redirect.service';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [
    MatDatepickerModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule, MatInputModule,
    MatFormFieldModule, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, MatCheckboxModule,
    MatButtonModule, RouterLink, MatIconModule, MatProgressSpinnerModule
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

  errorMsg: string | null = null;

  constructor(public habitService: HabitService, public redirect: CreatorRedirectService) {

  }

  ngOnInit(): void {
    this.redirect.setURL("/habits/form");
    this.today = this.habitService.getDateString(new Date());

    this.habitService.getHabits().subscribe({
      next: (habits: Habit[]) => {
        this.habits = habits;
        this.getFormValues(this.today);
        this.habitsLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.errorMsg = "you have no habits!"
        } else {
          this.errorMsg = "something went wrong unexpectedly :(";
        }
        this.habitsLoaded = true;
      }
    });
  }

  getFormValues(date: string) {
    this.formValuesLoaded = false;
    this.errorMsg = null;
    this.formValues = [];
    this.habitService.getDate(date).subscribe({
      next: (value: HabitDate) => {
        for (let i: number = 0; i < this.habits.length; i++) {
          const habit: Habit = this.habits[i];
          if (habit.enabled || this.toggleController.value === "backfill") {
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
          this.errorMsg = "no enabled habits could be found for that date"
        }
        this.formValuesLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.errorMsg = "no habits could be found for that date"
        } else {
          this.errorMsg = "something went wrong unexpectedly :(";
        }
        this.formValuesLoaded = true;
      }
    });
  }

  handleDateSelect(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const dateString = this.habitService.getDateString(event.value);
      this.getFormValues(dateString);
    } else {
      // we need to shut down the whole form if the value is invalid
      // we will do this by making the array empty and adding an error message
      this.formValues = [];
      this.errorMsg = "you must enter a valid date"
    }
  }

  handleToggle(event: MatButtonToggleChange): void {
    if (event.value === "today" && (
      this.dateController.value && 
      this.habitService.getDateString(this.dateController.value) !== this.today
    )) {
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
          },
          error: (error: HttpErrorResponse) => {
            this.errorMsg = "something went wrong unexpectedly :(";
            this.formValues = [];
            this.formValuesLoaded = true;
          }
        })
      }
    }
  }

  handleUndo(index: number): void {
    if (this.dateController.value) {
      this.formValuesLoaded = false;
      const dateString = this.habitService.getDateString(this.dateController.value);
      this.habitService.setValue(this.formValues[index].name, dateString, false).subscribe({
        next: () => {
          this.formValues[index].value = 0;
          this.formValuesLoaded = true;
        },
        error: (error: HttpErrorResponse) => {
          this.errorMsg = "something went wrong unexpectedly :(";
          this.formValues = [];
          this.formValuesLoaded = true;
        }
      })
    }
  }

  handleDisable(): void {
    for (let i: number = 0; i < this.formValues.length; i++) {
      let requests = 0;
      if (this.formValues[i].selected && this.dateController.value) {
        this.formValuesLoaded = false;
        requests++;
        const dateString = this.habitService.getDateString(this.dateController.value);
        this.habitService.setValue(this.formValues[i].name, dateString, null).subscribe({
          next: () => {
            this.formValues[i].value = null;
            this.formValues[i].selected = false;
            requests--;
            // this might technically be a race condition
            if (requests === 0) {
              this.formValuesLoaded = true;
            }
          },
          error: (error: HttpErrorResponse) => {
            this.errorMsg = "something went wrong unexpectedly :(";
            this.formValues = [];
            this.formValuesLoaded = true;
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
