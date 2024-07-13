import { Component, Output, EventEmitter } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-create-metric-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './create-metric-bar.component.html',
  styleUrl: './create-metric-bar.component.css'
})
export class CreateMetricBarComponent {
  @Output() createMetricClicked = new EventEmitter<any>();
}
