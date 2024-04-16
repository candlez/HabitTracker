import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-metric-button-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './metric-button-bar.component.html',
  styleUrl: './metric-button-bar.component.css'
})
export class MetricButtonBarComponent {

}
