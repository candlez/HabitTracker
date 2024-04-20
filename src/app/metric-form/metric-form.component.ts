import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { FormMetricHolderComponent } from './form-metric-holder/form-metric-holder.component';
import { MetricButtonBarComponent } from './metric-button-bar/metric-button-bar.component';

import { DataService, Metric } from '../data.service';



@Component({
  selector: 'app-metric-form',
  standalone: true,
  imports: [NgFor, FormMetricHolderComponent, MetricButtonBarComponent],
  templateUrl: './metric-form.component.html',
  styleUrl: './metric-form.component.css'
})
export class MetricFormComponent {
  date: string;
  data: DataService;
  metrics: Metric[]

  constructor(data: DataService) {
    this.data = data;
    this.date = this.data.getDateString();

    this.metrics = [];
    this.data.getDate("metric", this.date).subscribe(
      data => this.metrics = this.parseData(data)
    );
  }

  parseData(data: Object[]) {
    var arr: Metric[] = [];
    Object.entries(data[0]).forEach((entry, index) => {
      if (index != 0 && entry[1] != -1) {
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
    // this is already done?
  }
}
