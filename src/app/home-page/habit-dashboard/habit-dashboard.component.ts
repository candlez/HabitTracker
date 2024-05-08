import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { HabitPieChartComponent } from './habit-pie-chart/habit-pie-chart.component';

import { DataService } from '../../data.service';


@Component({
  selector: 'app-habit-dashboard',
  standalone: true,
  imports: [HabitPieChartComponent, NgFor],
  templateUrl: './habit-dashboard.component.html',
  styleUrl: './habit-dashboard.component.css'
})
export class HabitDashboardComponent {
  data: DataService;
  dates: string[];
  dayOfTheWeek: number;
  daysOfTheWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  selected: number;

  constructor(data: DataService) {
    this.data = data;
    this.dates = [];
    this.dates.length = 7;

    const date = new Date();
    this.dayOfTheWeek = date.getDay();
    date.setDate(date.getDate() - this.dayOfTheWeek);
    for (var i = 0; i < this.dayOfTheWeek; i++) {
      this.dates[i] = this.data.getDateString(date);
      date.setDate(date.getDate() + 1);
    }
    const today = this.data.getDateString(date);
    for (var i = this.dayOfTheWeek; i < 7; i++) {
      this.dates[i] = today;
    }
    this.selected = this.dayOfTheWeek;
  }
}
