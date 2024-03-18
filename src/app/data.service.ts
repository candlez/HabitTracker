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
    return this.http.get<Habit[]>(this.baseURL + "/habit");
  }
  
}

export interface Habit {
  COLUMN_NAME: string;
}
