import { Routes } from '@angular/router';

import { HabitFormComponent } from './habit-form/habit-form.component';
import { ButtonCounterComponent } from './button-counter/button-counter.component';

export const routes: Routes = [
    {path: "habits", component: HabitFormComponent},
    {path: "test", component: ButtonCounterComponent},
    {path: "", redirectTo: "/habits", pathMatch: "full"}
];
