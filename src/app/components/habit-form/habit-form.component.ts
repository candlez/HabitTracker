import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { SubmitButtonBarComponent } from './submit-button-bar/submit-button-bar.component';
import { FormHabitHolderComponent } from './form-habit-holder/form-habit-holder.component';

import { DataService, Habit } from '../../services/data.service';



@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [SubmitButtonBarComponent, FormHabitHolderComponent, NgFor],
  providers: [],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent {
  date: string;
  data: DataService;
  habits: Habit[];


  constructor(data: DataService) {
    this.data = data;
    this.date = this.data.getDateString(new Date());
    
    this.habits = [];
    this.data.getDate("habit", this.date).subscribe(
      data => this.habits = this.parseData(data)
    );
  }

  parseData(data: Object[]) {
    var arr: Habit[] = [];
    Object.entries(data[0]).forEach((entry, index) => {
      if (index != 0 && entry[1] != null) {
        arr.push({
          name: entry[0],
          value: entry[1],
          originalValue: entry[1]
        });
      }
    });
    return arr;
  }

  submitChanges() {
    this.habits.forEach((habit) => {
      if (habit.value == 1) {
        // this.data.markHabitComplete(habit.name, this.date).subscribe();
        this.data.markEntry("habit", this.date, habit.name, "TRUE").subscribe();
        habit.originalValue = 1;
        habit.value = 0;
      }
    })
  }

  undoPrevious(habit: string) {
    this.data.markEntry("habit", this.date, habit, "FALSE").subscribe();
  }
}



