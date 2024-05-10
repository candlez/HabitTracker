import { Component, Input, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from "@angular/core";
import { NgIf, isPlatformBrowser } from '@angular/common';


import { DataService } from '../../../data.service';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-metric-line-chart',
  standalone: true,
  imports: [NgIf, BaseChartDirective],
  templateUrl: './metric-line-chart.component.html',
  styleUrl: './metric-line-chart.component.css'
})
export class MetricLineChartComponent implements OnInit {
  @Input() metric!: string;
  @Input() dates!: string[];

  data: DataService;

  loaded: boolean = false;

  config = {
    type: "line",
    data: {
      labels: [""],
      datasets: [{
        label: "",
        data: [1],
        backgroundColor: "green",
        borderColor: "green",
      }],
      spanGaps: true
    },
    options: {
      scales: {
        y: {
          min: 0
        }
      }
    }
  }

  isBrowser!: boolean;

  constructor(data: DataService, @Inject(PLATFORM_ID) private platformId: Object) { 
    this.data = data;
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.config.data.labels.pop();
    this.config.data.datasets[0].data.pop();
    this.config.data.datasets[0].label = this.metric;
    var valueList: number[] = [];

    this.dates.forEach((date, index) => {
      this.data.getEntry("metric", date, this.metric).subscribe(
        data => {
          if (data.length == 0 || data[0][this.metric] == "-1") {
            valueList.push(NaN);
          } else {
            valueList.push(data[0][this.metric]);
          }
          if (valueList.length == 30) {
            this.config.data.datasets[0].data = valueList;
            this.loaded = true;
          }
        }
      );

      if (index % 6 == 0) {
        this.config.data.labels.push(date)
      } else {
        this.config.data.labels.push("");
      }
    });

  }
}
