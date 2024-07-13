import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-habit-popup',
  standalone: true,
  imports: [],
  templateUrl: './create-habit-popup.component.html',
  styleUrl: './create-habit-popup.component.css'
})
export class CreateHabitPopupComponent {
  @Output() habitEvent = new EventEmitter<string>();
  @Output() clickedOff = new EventEmitter<boolean>();

  submitHabit(habit: string) {
    this.habitEvent.emit(habit);
  }

  clickOff() {
    this.clickedOff.emit(true);
  }
}
