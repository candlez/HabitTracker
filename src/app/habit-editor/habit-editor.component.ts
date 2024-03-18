import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { CreateBarComponent } from './create-bar/create-bar.component';
import { CreateHabitPopupComponent } from './create-habit-popup/create-habit-popup.component';
import { EditHabitHolderComponent } from './edit-habit-holder/edit-habit-holder.component';

import { DataService } from '../data.service';


@Component({
  selector: 'app-habit-editor',
  standalone: true,
  imports: [CreateBarComponent, CreateHabitPopupComponent, NgIf, NgFor, EditHabitHolderComponent],
  templateUrl: './habit-editor.component.html',
  styleUrl: './habit-editor.component.css'
})
export class HabitEditorComponent {
  createHabitPopUp: boolean;
  editHabitPopUp: boolean;
  data: DataService;

  habits: string[];

  constructor(dataService: DataService) {
    this.data = dataService;
    this.createHabitPopUp = false;
    this.editHabitPopUp = false;

    this.habits = [];
    dataService.getHabits().subscribe(
      data => this.habits = data.map((value) => {return value.COLUMN_NAME})
    );
    this.habits.splice(0, 1);
    // this.http.get(this.url).subscribe();
  }

  setCreateHabitPopUp(value: boolean) {
    this.createHabitPopUp = value;
  }

  setEditHabitPopUp(value: boolean) {
    this.createHabitPopUp = value;
  }

  exitPopUps() { // currently this fires when anything is clicked
    this.createHabitPopUp = false;
    this.editHabitPopUp = false;
  }

  addHabit(newHabit: string) {
    // there needs to be some checks for this
    this.createHabitPopUp = false;
    console.log(newHabit);
    // do http
    this.data.addHabit(newHabit).subscribe(); // we should do something with this once the response is better
    this.habits.push(newHabit); // this should only happen if the http is sucessful
  }

  editHabit(oldHabit: string, newHabit: string) {
    // do something
    // the back end needs to be updated to support this
  }

  deleteHabit(oldHabit: string) {
    // the http request should happen first to make sure it works
    this.habits.splice(this.habits.indexOf(oldHabit), 1);
    this.data.deleteHabit(oldHabit).subscribe();
  }
}
