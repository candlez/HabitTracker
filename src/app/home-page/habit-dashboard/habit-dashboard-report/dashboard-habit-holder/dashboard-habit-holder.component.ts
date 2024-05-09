import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-habit-holder',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-habit-holder.component.html',
  styleUrl: './dashboard-habit-holder.component.css'
})
export class DashboardHabitHolderComponent {
  @Input() habit!: string;
}
