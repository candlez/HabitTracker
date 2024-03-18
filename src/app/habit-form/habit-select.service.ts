import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class HabitSelectService {
  data: DataService;
  http: HttpClientModule;
  habits: Map<String, boolean>;

  constructor(data: DataService, http: HttpClientModule) { 
    this.data = data; // this is probably useless
    this.http = http;
    this.habits = new Map<String, boolean>();

    // set up database
    this.habits.set("Eat", true);
    this.habits.set("Sleep", false);
    this.habits.set("Workout", true);
  }

  submit() {

  }
}
