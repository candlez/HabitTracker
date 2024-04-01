import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // this is where the HTTP requests will be made I think
  http: HttpClient;
  baseURL: string = "http://localhost:8393";


  constructor(http: HttpClient) { 
    this.http = http;
  }

  getHabits() {
    return this.http.get<HabitColumn[]>(this.baseURL + "/habit");
  }

  addHabit(habit: string) {
    return this.http.put(this.baseURL + "/habit/" + habit, undefined);
  }

  editHabit(oldHabit: string, newHabit: string) {
    return this.http.put(this.baseURL + "/habit/" + oldHabit + "/" + newHabit, undefined);
  }

  deleteHabit(habit: string) {
    return this.http.delete(this.baseURL + "/habit/" + habit);
  }
  
  getDate(date: string) {
    return this.http.get<Object[]>(this.baseURL + "/date/" + date);
  }

  // this should now be handled by the SQL server
  initializeDate(date: string) {
    return this.http.put(this.baseURL + "/date/" + date, undefined);
  }

  markAsComplete(habit: string, date: string) {
    return this.http.put(this.baseURL + "/date/" + date + "/" + habit + "/TRUE", undefined);
  }

  markAsNotComplete(habit: string, date: string) {
    return this.http.put(this.baseURL + "/date/" + date + "/" + habit + "/FALSE", undefined);
  }
}

export interface HabitColumn {
  COLUMN_NAME: string;
}

export interface Habit {
  name: string;
  value: number;
  originalValue: number;
}
