import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { FormMetricHolderComponent } from './form-metric-holder/form-metric-holder.component';

import { DataService, Metric } from '../data.service';



@Component({
  selector: 'app-metric-form',
  standalone: true,
  imports: [NgFor, FormMetricHolderComponent],
  templateUrl: './metric-form.component.html',
  styleUrl: './metric-form.component.css'
})
export class MetricFormComponent {
  date: string;
  data: DataService;
  metrics: Metric[]

  constructor(data: DataService) {
    var date = new Date();
    var local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    this.date = local.toISOString().split('T')[0];
    this.data = data;

    this.metrics = [];
    this.data.getDate("metric", this.date).subscribe(
      data => this.metrics = this.parseData(data)
    );
  }

  parseData(data: Object[]) {
    var arr: Metric[] = [];
    Object.entries(data[0]).forEach((entry, index) => {
      if (index != 0) {
        arr.push({
          name: entry[0],
          value: entry[1],
        });
      }
    });
    return arr;
  }

  submitChange(value: number, metric: Metric) {
    // make http call
    this.data.markEntry("metric", this.date, metric.name, value).subscribe();
    // update local data

  }
}
