import { Component } from '@angular/core';

import { HabitPieChartComponent } from './habit-pie-chart/habit-pie-chart.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HabitPieChartComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
