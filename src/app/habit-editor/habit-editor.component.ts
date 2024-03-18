import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CreateBarComponent } from './create-bar/create-bar.component';
import { CreateHabitPopupComponent } from './create-habit-popup/create-habit-popup.component';

import { DataService, Habit } from '../data.service';



@Component({
  selector: 'app-habit-editor',
  standalone: true,
  imports: [CreateBarComponent, CreateHabitPopupComponent, NgIf, NgFor],
  templateUrl: './habit-editor.component.html',
  styleUrl: './habit-editor.component.css'
})
export class HabitEditorComponent {
  createHabitPopUp: boolean;
  data: DataService;

  habits: string[];

  constructor(dataService: DataService) {
    this.data = dataService;
    this.createHabitPopUp = false;

    this.habits = [];
    dataService.getHabits().subscribe(
      data => this.habits = data.map((value) => {return value.COLUMN_NAME})
    );
    // this.http.get(this.url).subscribe();
  }

  setCreateHabitPopUp(value: boolean) {
    this.createHabitPopUp = value;
  }

  addHabit(newHabit: string) {
    this.createHabitPopUp = false;
    console.log(newHabit);
    // do http
  }

  editHabit(oldHabit: string, newHabit: string) {
    // do something
  }

  deleteHabit(oldHabit: string) {
    // do something
  }
}
