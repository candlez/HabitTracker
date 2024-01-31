import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HabitSelectService {
  habits: Map<String, boolean>;

  constructor() { 
    this.habits = new Map<String, boolean>();

    this.habits.set("Eat", true);
    this.habits.set("Sleep", false);
    this.habits.set("Workout", true);
  }
}
