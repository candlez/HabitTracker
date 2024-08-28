import { Component, Input, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from "@angular/core";
import { NgIf, isPlatformBrowser } from '@angular/common';

import { MetricDateValuePair, MetricService } from '../../../../services/metric.service';

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
  @Input() startDate!: string;
  @Input() endDate!: string;

  loaded: boolean = false;
  isBrowser!: boolean;

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
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0
        }
      }
    }
  }

  constructor(public metricService: MetricService, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // what the actual sigma does this do?
    this.config.data.labels.pop();
    this.config.data.datasets[0].data.pop();

    this.config.data.datasets[0].label = this.metric;

    this.metricService.getValueRange(this.metric, this.startDate, this.endDate).subscribe({
      next: (data: MetricDateValuePair[]) => {
        this.config.data.datasets[0].data = data.map((val, index) => {
          if (index % 6 == 0) {
            this.config.data.labels.push(val.date.split("T")[0]);
          } else {
            this.config.data.labels.push("");
          }

          if (val.value === null) {
            return NaN;
          } else {
            return val.value
          }
        });
        this.loaded = true;
      }
    });
  }
}
