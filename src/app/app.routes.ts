import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { HabitEditorComponent } from './components/habit-editor/habit-editor.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MetricFormComponent } from './components/metric-form/metric-form.component';
import { MetricEditorComponent } from './components/metric-editor/metric-editor.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
    {path: "login", component: LoginPageComponent},
    {path: "about", component: AboutPageComponent},
    {path: "habits/edit", component: HabitEditorComponent, canActivate: [authGuard]},
    {path: "habits", component: HabitFormComponent, canActivate: [authGuard]},
    {path: "metrics/edit", component: MetricEditorComponent, canActivate: [authGuard]},
    {path: "metrics", component: MetricFormComponent, canActivate: [authGuard]},
    {path: "dashboard", component: HomePageComponent},
    {path: "not-found", component: NotFoundPageComponent},
    {path: "", redirectTo: "/dashboard", pathMatch: "full"},
    {path: "**", redirectTo: "not-found", pathMatch: "full"},
];
