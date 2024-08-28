import { Component } from '@angular/core';

import { HabitDashboardComponent } from './habit-dashboard/habit-dashboard.component';
import { MetricDashboardComponent } from './metric-dashboard/metric-dashboard.component';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HabitDashboardComponent, MetricDashboardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
