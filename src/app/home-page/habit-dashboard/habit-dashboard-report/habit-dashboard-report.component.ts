import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { DashboardHabitHolderComponent } from './dashboard-habit-holder/dashboard-habit-holder.component';


@Component({
  selector: 'app-habit-dashboard-report',
  standalone: true,
  imports: [DashboardHabitHolderComponent, NgFor],
  templateUrl: './habit-dashboard-report.component.html',
  styleUrl: './habit-dashboard-report.component.css'
})
export class HabitDashboardReportComponent implements OnInit, OnChanges {
  @Input() habits!: Object;
  @Input() isFuture!: boolean;

  completed!: string[];
  notCompleted!: string[];

  constructor() {

  }

  ngOnInit(): void {
    this.parseData()
  }

  ngOnChanges(): void {
    this.parseData();
  }

  parseData() {
    this.completed = [];
    this.notCompleted = [];
    Object.entries(this.habits).forEach((habit) => {
      if (habit[0] != "date" && habit[1] != null) {
        if (habit[1] == 0 || this.isFuture) {
          this.notCompleted.push(habit[0]);
        } else {
          this.completed.push(habit[0]);
        }
      }
    });
  }
}
