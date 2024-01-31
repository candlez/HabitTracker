import { Component } from '@angular/core';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { HabitFormComponent } from './habit-form/habit-form.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';

import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavHeaderComponent, HabitFormComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HabitTracker';

  constructor(testService: TestService) {
    console.log(testService.testValue);
  }
}
