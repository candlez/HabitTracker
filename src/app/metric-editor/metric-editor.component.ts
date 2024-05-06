import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { CreateMetricPopupComponent } from './create-metric-popup/create-metric-popup.component';
import { EditMetricPopupComponent } from './edit-metric-popup/edit-metric-popup.component';
import { CreateMetricBarComponent } from './create-metric-bar/create-metric-bar.component';
import { EditMetricHolderComponent } from './edit-metric-holder/edit-metric-holder.component';

import { DataService, Column } from '../data.service';


@Component({
  selector: 'app-metric-editor',
  standalone: true,
  imports: [NgIf, NgFor, CreateMetricPopupComponent, EditMetricPopupComponent, 
    CreateMetricBarComponent, EditMetricHolderComponent],
  templateUrl: './metric-editor.component.html',
  styleUrl: './metric-editor.component.css'
})
export class MetricEditorComponent {
  data: DataService;
  metrics: Column[];

  date: string;

  createMetricPopup: boolean;
  editMetricPopup: boolean;

  selectedMetric: Column;

  constructor(data: DataService) {
    this.data = data;
    this.date = this.data.getDateString();
    this.metrics = [];
    this.data.getColumns("metric").subscribe(
      data => this.metrics = data
    );

    this.createMetricPopup = false;
    this.editMetricPopup = false;

    this.selectedMetric = {
      COLUMN_NAME: "",
      COLUMN_DEFAULT: null
    }
  }


  addMetric(name: string) {
    this.data.addColumn("metric", name).subscribe(); // should do something with this once the response is better
    this.data.enableColumn("metric", name).subscribe();
    this.data.markEntry("metric", this.date, name, "0").subscribe();
    this.metrics.push({COLUMN_NAME: name, COLUMN_DEFAULT: "FALSE"}); // this should only happen if the http is sucessful
  }

  editMetric(oldMetric: Column, newName: string) {
    this.data.editColumn("metric", oldMetric.COLUMN_NAME, newName).subscribe(); // should do something with this
    this.metrics[this.metrics.indexOf(oldMetric)].COLUMN_NAME = newName; // changes to local should be conditional on successful request
  }

  toggleMetric(metric: Column) {
    if (metric.COLUMN_DEFAULT == "0") {
      this.data.disableColumn("metric", metric.COLUMN_NAME).subscribe();
      this.data.markEntry("metric", this.date, metric.COLUMN_NAME, "-1").subscribe();
      metric.COLUMN_DEFAULT = "-1";
    } else {
      this.data.enableColumn("metric", metric.COLUMN_NAME).subscribe();
      this.data.markEntry("metric", this.date, metric.COLUMN_NAME, "0").subscribe();
      metric.COLUMN_DEFAULT = "0";
    }
  }

  deleteMetric(metric: Column) {
    this.data.deleteColumn("metric", metric.COLUMN_NAME).subscribe();
    this.metrics.splice(this.metrics.indexOf(metric), 1);
  }
}
