import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { HabitPieChartComponent } from './habit-pie-chart/habit-pie-chart.component';
import { HabitDashboardReportComponent } from './habit-dashboard-report/habit-dashboard-report.component';

import { DataService } from '../../data.service';



@Component({
  selector: 'app-habit-dashboard',
  standalone: true,
  imports: [HabitPieChartComponent, NgFor, NgIf, HabitDashboardReportComponent],
  templateUrl: './habit-dashboard.component.html',
  styleUrl: './habit-dashboard.component.css'
})
export class HabitDashboardComponent implements OnInit {
  data: DataService;
  dates: Object[];
  dayOfTheWeek!: number;
  daysOfTheWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  selected!: number;
  selectedDate!: Object;
  loaded: boolean = false;

  constructor(data: DataService) {
    this.data = data;
    this.dates = [];
    this.dates.length = 7;
  }

  ngOnInit(): void {
    const date = new Date();
    this.dayOfTheWeek = date.getDay();
    this.selected = this.dayOfTheWeek;
    date.setDate(date.getDate() - this.dayOfTheWeek);

    var outer = 0;
    var inner = 0;
    while (outer < this.dayOfTheWeek) {
      this.data.getDate("habit", this.data.getDateString(date)).subscribe(
        data => {
          this.dates[inner] = data[0]
          inner++;
        }
      );
      date.setDate(date.getDate() + 1);
      outer++;
    }
    this.data.getDate("habit", this.data.getDateString(date)).subscribe(
      data => {
        this.loaded = true;
        for (var j = this.dayOfTheWeek; j < 7; j++) {
          this.dates[j] = data[0];
        }
        this.selectedDate = this.dates[this.selected];
      }
    );
  }

  test() {
    console.log(this.selectedDate);
  }
}
