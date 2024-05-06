import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-edit-habit-popup',
  standalone: true,
  imports: [],
  templateUrl: './edit-habit-popup.component.html',
  styleUrl: './edit-habit-popup.component.css'
})
export class EditHabitPopupComponent {
  @Output() habitEvent = new EventEmitter<string>();
  @Output() clickedOff = new EventEmitter<any>();
}
