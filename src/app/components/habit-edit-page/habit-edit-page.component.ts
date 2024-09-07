import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { HabitService, Habit } from '../../services/habit.service';
import { CreatorRedirectService } from '../../services/creator-redirect.service';


@Component({
  selector: 'app-habit-edit-page',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, MatButtonModule, MatIcon, RouterLink],
  templateUrl: './habit-edit-page.component.html',
  styleUrl: './habit-edit-page.component.css'
})
export class HabitEditPageComponent implements OnInit {
  habits!: Habit[];
  habitsLoaded: boolean = false;

  errMsg: string | undefined = undefined;

  constructor(public habitService: HabitService, public redirect: CreatorRedirectService) {

  }

  ngOnInit(): void {
    this.redirect.setURL("/habits/edit");

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

  toggleEnabled(index: number) {
    const habit = this.habits[index]
    this.habitService.editHabit(habit.name, undefined, undefined, !habit.enabled).subscribe({
      next: () => {
        this.habits[index].enabled = !habit.enabled;
      }
    })
  }
}
