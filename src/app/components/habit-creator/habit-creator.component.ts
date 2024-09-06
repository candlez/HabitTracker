import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-habit-creator',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './habit-creator.component.html',
  styleUrl: './habit-creator.component.css'
})
export class HabitCreatorComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl<string>(""),
    description: new FormControl<string>(""),
    enabled: new FormControl<boolean>(true)
  })

  constructor(public habitService: HabitService, public router: Router) {

  }


  handleSubmit(): void {
    if (this.form.valid) {
      this.habitService.createHabit(
        this.form.get("name")?.value,
        this.form.get("description")?.value,
        this.form.get("enabled")?.value
      ).subscribe({
        next: () => {
          this.router.navigateByUrl("/habits/form");
        }
      })
    }

  }
}
