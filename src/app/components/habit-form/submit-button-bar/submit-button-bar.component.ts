import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-submit-button-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './submit-button-bar.component.html',
  styleUrl: './submit-button-bar.component.css'
})
export class SubmitButtonBarComponent {
  @Output() submit = new EventEmitter<any>()
}
