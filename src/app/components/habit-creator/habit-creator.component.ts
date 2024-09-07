import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

import { HabitService } from '../../services/habit.service';
import { CreatorRedirectService } from '../../services/creator-redirect.service';

@Component({
  selector: 'app-habit-creator',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    MatSlideToggleModule, NgIf, MatIconModule
  ],
  templateUrl: './habit-creator.component.html',
  styleUrl: './habit-creator.component.css'
})
export class HabitCreatorComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl<string>(""),
    description: new FormControl<string>(""),
    enabled: new FormControl<boolean>(true)
  });

  errMsg: string | undefined = undefined;

  constructor(
    public habitService: HabitService, 
    public router: Router,
    public redirect: CreatorRedirectService
  ) {

  }

  goBack(): void {
    const url = this.redirect.getURL();
    this.router.navigateByUrl(url ? url : "/habits/form");
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.habitService.createHabit(
        this.form.get("name")?.value,
        this.form.get("description")?.value,
        this.form.get("enabled")?.value
      ).subscribe({
        next: () => {
          this.goBack();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.errMsg = "you must specify a name";
          } else {
            this.errMsg = error.error;
          }
        }
      })
    }

  }
}
