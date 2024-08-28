import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { MetricLineChartComponent } from './metric-line-chart/metric-line-chart.component';

import { MetricService, Metric } from '../../../services/metric.service';


@Component({
  selector: 'app-metric-dashboard',
  standalone: true,
  imports: [ NgFor, NgIf, MetricLineChartComponent ],
  templateUrl: './metric-dashboard.component.html',
  styleUrl: './metric-dashboard.component.css'
})
export class MetricDashboardComponent implements OnInit {
  startDate!: string;
  endDate!: string;
  metrics!: Metric[];

  loaded: boolean = false;

  constructor(public metricService: MetricService) {

  }

  ngOnInit(): void {
    const date: Date = new Date();
    this.endDate = this.metricService.getDateString(date);
    date.setDate(date.getDate() - 29);
    this.startDate = this.metricService.getDateString(date);

    this.metricService.getMetrics().subscribe({
      next: (metrics: Metric[]) => {
        this.metrics = metrics.filter((metric) => {return metric.enabled});
        this.loaded = true;
      },
      error: (error: HttpErrorResponse) => {console.error(error)}
    });
  }
}
