import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  baseURL: string = environment.API_BASE_URL;

  constructor(public http: HttpClient) { 

  }

  getDateString(date: Date): string {
    var local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return local.toISOString().split('T')[0];
  }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.baseURL}/habits`)
  }

  getHabit(name: string): Observable<Habit> {
    return this.http.get<Habit>(`${this.baseURL}/habits/${name}`);
  }

  createHabit(name: string, description?: string, enabled?: boolean): Observable<string> {
    const body: object = {
      ...(description !== undefined && {description}),
      ...(enabled !== undefined && {enabled})
    }
    return this.http.post(`${this.baseURL}/habits/${name}`, body, {responseType: "text"});
  }

  editHabit(oldName: string, newName?: string, description?: string, enabled?: boolean): Observable<string> {
    const body: object = {
      ...(newName !== undefined && {newName}),
      ...(description !== undefined && {description}),
      ...(enabled !== undefined && {enabled})
    }
    return this.http.put(`${this.baseURL}/habits/${oldName}`, body, {responseType: "text"});
  }

  deleteHabit(name: string): Observable<string> {
    return this.http.delete(`${this.baseURL}/habits/${name}`, {responseType: "text"});
  }

  getValue(name: string, date: string): Observable<HabitDateValuePair> {
    return this.http.get<HabitDateValuePair>(`${this.baseURL}/habits/dates/${name}/${date}`);
  }

  setValue(name: string, date: string, value: boolean): Observable<string> {
    return this.http.put(`${this.baseURL}/habits/dates/${name}/${date}`, {value}, {responseType: "text"});
  }

  getValueRange(name: string, start: string, end: string): Observable<HabitDateValuePair[]> {
    return this.http.get<HabitDateValuePair[]>(`${this.baseURL}/habits/dates/${name}/from/${start}/to/${end}`);
  }
}

export interface Habit {
  name: string,
  description: string,
  enabled: boolean
}

export interface HabitDateValuePair {
  date: string,
  value: number | null,
}
