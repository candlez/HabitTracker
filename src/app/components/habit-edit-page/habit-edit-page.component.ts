import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

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

  constructor(
    public habitService: HabitService, 
    public redirect: CreatorRedirectService,
    public dialog: MatDialog
  ) {

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

  openDeleteDialog(index: number) {
    const habit = this.habits[index];
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {habit}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.habitService.deleteHabit(habit.name).subscribe({
          next: () => {
            this.habits.splice(index, 1);
          }
        })
      }
    });
  }
}
