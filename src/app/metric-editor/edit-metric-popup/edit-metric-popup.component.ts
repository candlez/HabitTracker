import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-metric-popup',
  standalone: true,
  imports: [],
  templateUrl: './edit-metric-popup.component.html',
  styleUrl: './edit-metric-popup.component.css'
})
export class EditMetricPopupComponent {
  @Output() metricEdited = new EventEmitter<string>();
  @Output() clickedOff = new EventEmitter<any>();
}
