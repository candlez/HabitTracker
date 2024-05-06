import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';


import { Column } from './../../data.service';

@Component({
  selector: 'app-edit-metric-holder',
  standalone: true,
  imports: [NgClass],
  templateUrl: './edit-metric-holder.component.html',
  styleUrl: './edit-metric-holder.component.css'
})
export class EditMetricHolderComponent {
  @Input() metric!: Column;
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() toggleClicked = new EventEmitter<any>();

}
