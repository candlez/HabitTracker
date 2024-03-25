import { Component } from '@angular/core';
import { NgIf, NgFor, SlicePipe } from '@angular/common';

import { CreateBarComponent } from './create-bar/create-bar.component';
import { CreateHabitPopupComponent } from './create-habit-popup/create-habit-popup.component';
import { EditHabitHolderComponent } from './edit-habit-holder/edit-habit-holder.component';
import { EditHabitPopupComponent } from './edit-habit-popup/edit-habit-popup.component';

import { DataService } from '../data.service';



@Component({
  selector: 'app-habit-editor',
  standalone: true,
  imports: [CreateBarComponent, CreateHabitPopupComponent, NgIf, NgFor, EditHabitHolderComponent,
  EditHabitPopupComponent, SlicePipe],
  templateUrl: './habit-editor.component.html',
  styleUrl: './habit-editor.component.css'
})
export class HabitEditorComponent {
  createHabitPopUp: boolean;
  editHabitPopUp: boolean;
  data: DataService;

  habits: string[];
  selectedHabit: string;

  constructor(dataService: DataService) {
    this.data = dataService;
    this.createHabitPopUp = false;
    this.editHabitPopUp = false;

    this.habits = [];
    dataService.getHabits().subscribe(
      data => this.habits = data.map((value) => {return value.COLUMN_NAME})
    );

    this.selectedHabit = "";
  }

  setCreateHabitPopUp(value: boolean) {
    this.createHabitPopUp = value;
  }

  setEditHabitPopUp(value: boolean) {
    this.editHabitPopUp = value;
  }

  setSelectedHabit(habit: string) {
    this.selectedHabit = habit;
    console.log(this.selectedHabit);
  }

  exitPopUps() { // currently this fires when anything is clicked
    this.createHabitPopUp = false;
    this.editHabitPopUp = false;
  }

  addHabit(newHabit: string) {
    // there needs to be some checks for this
    this.createHabitPopUp = false;
    // do http
    this.data.addHabit(newHabit).subscribe(); // should do something with this once the response is better
    this.habits.push(newHabit); // this should only happen if the http is sucessful
  }

  editHabit(oldHabit: string, newHabit: string) {
    // do something
    // the back end needs to be updated to support this
    this.editHabitPopUp = false;
    this.data.editHabit(oldHabit, newHabit).subscribe(); // should do something with this
    this.habits[this.habits.indexOf(oldHabit)] = newHabit; // changes to local should be conditional on successful request
  }

  deleteHabit(oldHabit: string) {
    // the http request should happen first to make sure it works
    this.habits.splice(this.habits.indexOf(oldHabit), 1);
    this.data.deleteHabit(oldHabit).subscribe();
  }
}
