import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-metric-popup',
  standalone: true,
  imports: [],
  templateUrl: './create-metric-popup.component.html',
  styleUrl: './create-metric-popup.component.css'
})
export class CreateMetricPopupComponent {
  @Output() metricCreated = new EventEmitter<string>();
  @Output() clickedOff = new EventEmitter<any>();
}
