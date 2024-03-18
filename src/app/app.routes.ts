import { Routes } from '@angular/router';

import { HabitFormComponent } from './habit-form/habit-form.component';
import { ButtonCounterComponent } from './button-counter/button-counter.component';
import { HabitEditorComponent } from './habit-editor/habit-editor.component';

export const routes: Routes = [
    {path: "habits/edit", component: HabitEditorComponent},
    {path: "habits", component: HabitFormComponent},
    {path: "test", component: ButtonCounterComponent},
    {path: "", redirectTo: "/habits", pathMatch: "full"}
];
