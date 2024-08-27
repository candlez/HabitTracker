import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { HabitEditPageComponent } from './components/habit-edit-page/habit-edit-page.component';
import { HabitEditorComponent } from './components/habit-editor/habit-editor.component';
import { HabitCreatorComponent } from './components/habit-creator/habit-creator.component';
import { MetricFormComponent } from './components/metric-form/metric-form.component';
import { MetricEditPageComponent } from './components/metric-edit-page/metric-edit-page.component';
import { MetricEditorComponent } from './components/metric-editor/metric-editor.component';
import { MetricCreatorComponent } from './components/metric-creator/metric-creator.component';

export const routes: Routes = [
    {path: "login", component: LoginPageComponent},
    {path: "about", component: AboutPageComponent},
    {
        path: "habits",
        children: [
            {path: "form", component: HabitFormComponent, canActivate: [authGuard]},
            {path: "edit", component: HabitEditPageComponent, canActivate: [authGuard]},
            {path: "edit/:habit", component: HabitEditorComponent, canActivate: [authGuard]},
            {path: "create", component: HabitCreatorComponent, canActivate: [authGuard]}
        ]
    },
    {
        path: "metrics",
        children: [
            {path: "form", component: MetricFormComponent, canActivate: [authGuard]},
            {path: "edit", component: MetricEditPageComponent, canActivate: [authGuard]},
            {path: "edit/:metric", component: MetricEditorComponent, canActivate: [authGuard]},
            {path: "create", component: MetricCreatorComponent, canActivate: [authGuard]}
        ]
    },
    {path: "dashboard", component: HomePageComponent},
    {path: "not-found", component: NotFoundPageComponent},
    {path: "", redirectTo: "/dashboard", pathMatch: "full"},
    {path: "**", redirectTo: "not-found", pathMatch: "full"},
];
