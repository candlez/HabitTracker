import { Routes } from '@angular/router';

import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitEditorComponent } from './habit-editor/habit-editor.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MetricFormComponent } from './metric-form/metric-form.component';
import { MetricEditorComponent } from './metric-editor/metric-editor.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    {path: "login", component: LoginPageComponent},
    {path: "about", component: AboutPageComponent},
    {path: "habits/edit", component: HabitEditorComponent},
    {path: "habits", component: HabitFormComponent},
    {path: "metrics/edit", component: MetricEditorComponent},
    {path: "metrics", component: MetricFormComponent},
    {path: "dashboard", component: HomePageComponent},
    {path: "", redirectTo: "/dashboard", pathMatch: "full"}
];
