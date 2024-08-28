import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { HabitPieChartComponent } from './habit-pie-chart/habit-pie-chart.component';
import { HabitDashboardReportComponent } from './habit-dashboard-report/habit-dashboard-report.component';

import { HabitDate, HabitService } from '../../../services/habit.service';


@Component({
  selector: 'app-habit-dashboard',
  standalone: true,
  imports: [HabitPieChartComponent, NgFor, NgIf, HabitDashboardReportComponent],
  templateUrl: './habit-dashboard.component.html',
  styleUrl: './habit-dashboard.component.css'
})
export class HabitDashboardComponent implements OnInit {
  dates: HabitDate[] = [];
  today!: number;
  daysOfTheWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  selected!: number;
  datesSet: number = 0;

  constructor(public habitService: HabitService) {
  }

  ngOnInit(): void {
    const now = new Date();
    this.today = now.getDay();
    this.selected = this.today;
    now.setDate(now.getDate() - this.today);
    for (let i: number = 0; i < 7; i++) {
      this.getDateData(this.habitService.getDateString(now), i);
      now.setDate(now.getDate() + 1);
    }
  }

  getDateData(date: string, index: number): void {
    if (index > this.today) {
      this.dates[index] = this.dates[this.today];
      this.datesSet++;
    } else {
      this.habitService.getDate(date).subscribe({
        next: (date: HabitDate) => {
          this.dates[index] = date;
          this.datesSet++;
        },
        error: (error: HttpErrorResponse) => {console.error(error)}
      })
    }

  }
}
