import { Component, Input, OnInit } from '@angular/core';


import { DataService } from '../../../data.service';

import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto';

import { Inject, PLATFORM_ID } from "@angular/core";
import { NgIf, isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-habit-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, NgIf],
  templateUrl: './habit-pie-chart.component.html',
  styleUrl: './habit-pie-chart.component.css'
})
export class HabitPieChartComponent implements OnInit {
  data: DataService;

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
      radius: 100
    }
  }


  @Input() isFuture!: boolean;
  @Input() date!: string;

  constructor(data: DataService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.data = data;
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.data.getDate("habit", this.date).subscribe(
      data => {this.config.data.datasets[0].data = this.parseData(data)}
    )
  }

  parseData(data: Object[]) {
    const arr = [0, 0];
    Object.entries(data[0]).forEach((habit) => {
      if (habit[0] != "date" && habit[1] != null) {
        if (habit[1] == 0 || this.isFuture) {
          arr[1]++;
        } else {
          arr[0]++;
        }
      }
    });
    return arr;
  }
}
