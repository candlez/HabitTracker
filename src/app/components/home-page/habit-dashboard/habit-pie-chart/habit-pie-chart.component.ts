import { Component, Input, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from "@angular/core";
import { NgIf, isPlatformBrowser, NgClass } from "@angular/common";

import { BaseChartDirective } from 'ng2-charts';

import { Habit, HabitDate } from '../../../../services/habit.service';

@Component({
  selector: 'app-habit-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, NgIf, NgClass],
  templateUrl: './habit-pie-chart.component.html',
  styleUrl: './habit-pie-chart.component.css'
})
export class HabitPieChartComponent implements OnInit {
  @Input() isFuture!: boolean;
  @Input() dateData!: HabitDate;
  @Input() title!: string;
  @Input() selected!: boolean;

  isBrowser: boolean = false;

  config = {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [0, 1],
          backgroundColor: ["Green", "Grey"]
        }
      ]
    },
    options: {
      animation: false,
      radius: 60
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 

  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.config.data.datasets[0].data = this.parseData(this.dateData);
  }

  parseData(data: HabitDate) {
    if (data === null || data === undefined) {
      return [5, 5];
    }
    const arr = [0, 0];
    Object.entries(data).forEach((habit) => {
      if (habit[0] !== "date" && habit[1] !== null) {
        if (habit[1] === 0 || this.isFuture) {
          arr[1]++;
        } else {
          arr[0]++;
        }
      }
    });
    return arr;
  }
}
