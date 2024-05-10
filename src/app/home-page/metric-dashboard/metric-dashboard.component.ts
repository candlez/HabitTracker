import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { MetricLineChartComponent } from './metric-line-chart/metric-line-chart.component';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-metric-dashboard',
  standalone: true,
  imports: [ NgFor, NgIf, MetricLineChartComponent ],
  templateUrl: './metric-dashboard.component.html',
  styleUrl: './metric-dashboard.component.css'
})
export class MetricDashboardComponent implements OnInit {
  date: string;
  dates: string[];
  data: DataService;
  metrics: string[];

  loaded: boolean = false;

  constructor(data: DataService) {
    this.data = data;
    this.date = data.getDateString(new Date());
    this.dates = [];
    this.metrics = [];
  }

  ngOnInit(): void {
    this.data.getColumns("metric").subscribe(
      data => {
        data.forEach((metricColumn) => {
          if (metricColumn.COLUMN_DEFAULT == "0") {
            this.metrics.push(metricColumn.COLUMN_NAME);
          }
        });
        this.loaded = true;
      }
    );

    var d = new Date();
    d.setDate(d.getDate() - 29);
    for (var i = 0; i < 30; i++) {
      this.dates.push(this.data.getDateString(d));
      d.setDate(d.getDate() + 1);
    }
  }
}
