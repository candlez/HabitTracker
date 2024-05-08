import { Component } from '@angular/core';

import { HabitPieChartComponent } from './habit-pie-chart/habit-pie-chart.component';

@Component({
  selector: 'app-habit-dashboard',
  standalone: true,
  imports: [HabitPieChartComponent],
  templateUrl: './habit-dashboard.component.html',
  styleUrl: './habit-dashboard.component.css'
})
export class HabitDashboardComponent {

}
