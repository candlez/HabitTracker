import { Component, Output, EventEmitter } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-create-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './create-bar.component.html',
  styleUrl: './create-bar.component.css'
})
export class CreateBarComponent {
  @Output() createHabitClicked = new EventEmitter<boolean>();

  createHabitPopUp() {
    this.createHabitClicked.emit();
  }
}
