import { Routes } from '@angular/router';

import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitEditorComponent } from './habit-editor/habit-editor.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MetricFormComponent } from './metric-form/metric-form.component';

export const routes: Routes = [
    {path: "habits/edit", component: HabitEditorComponent},
    {path: "habits", component: HabitFormComponent},
    {path: "metrics", component: MetricFormComponent},
    {path: "dashboard", component: HomePageComponent},
    {path: "", redirectTo: "/dashboard", pathMatch: "full"}
];
