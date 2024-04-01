import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { SubmitButtonBarComponent } from './submit-button-bar/submit-button-bar.component';
import { FormHabitHolderComponent } from './form-habit-holder/form-habit-holder.component';

import { DataService, Habit } from '../data.service';



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
    var date = new Date();
    this.date = date.toISOString().split('T')[0]
    this.data = data;
    
    this.habits = [];
    this.data.getDate(this.date).subscribe(
      data => this.habits = this.parseDateData(data)
    );
  }

  parseDateData(data: Object[]) {
    var arr: Habit[] = [];
    Object.entries(data[0]).forEach((entry, index) => {
      if (index != 0) {
        arr.push({
          name: entry[0],
          value: entry[1],
          originalValue: entry[1]
        })
      }
    });
    return arr;
  }

  submitChanges() {
    this.test();
    this.habits.forEach((habit) => {
      if (habit.value == 1) {
        // do http
        // "this" keyword be correct in this context?
        this.data.markAsComplete(habit.name, this.date).subscribe();
        habit.originalValue = 1;
        habit.value = 0;
      }
    })
  }

  undoPrevious(habit: string) {
    this.data.markAsNotComplete(habit, this.date).subscribe();
  }

  test() {
    console.log(this.habits);
  }
}



