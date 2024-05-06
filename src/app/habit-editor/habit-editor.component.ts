import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { CreateBarComponent } from './create-bar/create-bar.component';
import { CreateHabitPopupComponent } from './create-habit-popup/create-habit-popup.component';
import { EditHabitHolderComponent } from './edit-habit-holder/edit-habit-holder.component';
import { EditHabitPopupComponent } from './edit-habit-popup/edit-habit-popup.component';

import { DataService, Column } from '../data.service';



@Component({
  selector: 'app-habit-editor',
  standalone: true,
  imports: [CreateBarComponent, CreateHabitPopupComponent, NgIf, NgFor, EditHabitHolderComponent,
  EditHabitPopupComponent],
  templateUrl: './habit-editor.component.html',
  styleUrl: './habit-editor.component.css'
})
export class HabitEditorComponent {
  createHabitPopUp: boolean;
  editHabitPopUp: boolean;
  data: DataService;
  date: string;

  habits: Column[];
  selectedHabit: Column;

  constructor(dataService: DataService) {
    this.data = dataService;
    this.createHabitPopUp = false;
    this.editHabitPopUp = false;

    this.date = this.data.getDateString();

    this.habits = [];
    dataService.getColumns("habit").subscribe(
      data => this.habits = data
    );

    this.selectedHabit = {
      COLUMN_NAME: "",
      COLUMN_DEFAULT: null
    };
  }

  setCreateHabitPopUp(value: boolean) {
    this.createHabitPopUp = value;
  }

  setEditHabitPopUp(value: boolean) {
    this.editHabitPopUp = value;
  }

  setSelectedHabit(habit: Column) {
    this.selectedHabit = habit;
  }

  exitPopUps() { // currently this fires when anything is clicked
    this.createHabitPopUp = false;
    this.editHabitPopUp = false;
  }

  addHabit(newHabit: string) {
    // there needs to be some checks for this
    this.createHabitPopUp = false;
    // do http
    this.data.addColumn("habit", newHabit).subscribe(); // should do something with this once the response is better
    this.data.enableColumn("habit", newHabit).subscribe();
    this.data.markEntry("habit", this.date, newHabit, "FALSE").subscribe();
    this.habits.push({COLUMN_NAME: newHabit, COLUMN_DEFAULT: "FALSE"}); // this should only happen if the http is sucessful
  }

  editHabit(oldHabit: Column, newHabit: string) {
    this.editHabitPopUp = false;
    this.data.editColumn("habit", oldHabit.COLUMN_NAME, newHabit).subscribe(); // should do something with this
    this.habits[this.habits.indexOf(oldHabit)].COLUMN_NAME = newHabit; // changes to local should be conditional on successful request
  }

  toggleHabit(habit: Column) {
    if (habit.COLUMN_DEFAULT == null) {
      this.data.enableColumn("habit", habit.COLUMN_NAME).subscribe();
      this.data.markEntry("habit", this.date, habit.COLUMN_NAME, "0").subscribe();
      habit.COLUMN_DEFAULT = "0";
    } else {
      this.data.disableColumn("habit", habit.COLUMN_NAME).subscribe();
      this.data.markEntry("habit", this.date, habit.COLUMN_NAME, "NULL").subscribe();
      habit.COLUMN_DEFAULT = null;
    }
  }

  deleteHabit(oldHabit: Column) {
    // the http request should happen first to make sure it works
    this.habits.splice(this.habits.indexOf(oldHabit), 1);
    this.data.deleteColumn("habit", oldHabit.COLUMN_NAME).subscribe();
  }
}
