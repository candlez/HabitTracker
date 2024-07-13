import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

import { Column } from '../../../services/data.service';


@Component({
  selector: 'app-edit-habit-holder',
  standalone: true,
  imports: [NgClass],
  templateUrl: './edit-habit-holder.component.html',
  styleUrl: './edit-habit-holder.component.css'
})
export class EditHabitHolderComponent {
  @Input() habit!: Column;
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() toggleClicked = new EventEmitter<any>();
  
}
