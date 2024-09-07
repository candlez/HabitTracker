import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { HabitService, Habit } from '../../services/habit.service';

@Component({
  selector: 'app-habit-edit-page',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, MatButtonModule, MatIcon],
  templateUrl: './habit-edit-page.component.html',
  styleUrl: './habit-edit-page.component.css'
})
export class HabitEditPageComponent implements OnInit {
  habits!: Habit[];
  habitsLoaded: boolean = false;

  errMsg: string | undefined = undefined;

  constructor(public habitService: HabitService) {

  }

  ngOnInit(): void {
      this.habitService.getHabits().subscribe({
        next: (values: Habit[]) => {
          this.habits = values;
          this.habitsLoaded = true;
        },
        error: (error: HttpErrorResponse) => {
          this.habitsLoaded = true;
          if (error.status === 404) {

          } else {

          }
        }
      });
  }
}
