import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-habit-holder',
  standalone: true,
  imports: [],
  templateUrl: './edit-habit-holder.component.html',
  styleUrl: './edit-habit-holder.component.css'
})
export class EditHabitHolderComponent {
  @Input() habit!: string;
  @Output() deleteClicked = new EventEmitter<boolean>();
  @Output() editClicked = new EventEmitter<string>();
  

}
