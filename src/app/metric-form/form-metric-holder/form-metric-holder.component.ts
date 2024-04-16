import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

import { Metric } from '../../data.service';


@Component({
  selector: 'app-form-metric-holder',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-metric-holder.component.html',
  styleUrl: './form-metric-holder.component.css'
})
export class FormMetricHolderComponent {
  error: string;

  @Input() metric!: Metric;
  @Output() submit = new EventEmitter<number>();

  constructor() {
    this.error = "";
  }

  handleSubmit(value: string) {
    // either the value is valid or not (emit if valid, display error if not)
    var metricValue = parseFloat(value);
    if (isNaN(metricValue)) {
      this.error = "Value Must Be A Valid Number"
    } else if (metricValue < 0) {
      this.error = "Value Must Be Positive";
    } else {
      this.error = "";
      this.metric.value = metricValue;
      this.submit.emit(metricValue);
    }
  }
}
