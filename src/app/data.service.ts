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

  getDateString() {
    var date = new Date();
    var local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return local.toISOString().split('T')[0];
  }

  getColumns(table: string) {
    return this.http.get<Column[]>(`${this.baseURL}/${table}`);
  }

  addColumn(table: string, column: string) {
    return this.http.put(`${this.baseURL}/${table}/${column}`, undefined);
  } 

  editColumn(table: string, oldColumn: string, newColumn: string) {
    return this.http.put(`${this.baseURL}/${table}/${oldColumn}/${newColumn}`, undefined);
  }

  deleteColumn(table: string, column: string) {
    return this.http.delete(`${this.baseURL}/${table}/${column}`);
  }
  
  getDate(table: string, date: string) {
    return this.http.get<Object[]>(`${this.baseURL}/date/${table}/${date}`);
  }

  markEntry(table: string, date: string, column: string, value: any) {
    return this.http.put(`${this.baseURL}/date/${table}/${date}/${column}/${value}`, undefined);
  }

  enableColumn(table: string, column: string) {
    return this.http.put(`${this.baseURL}/${table}/enable/${column}`, undefined);
  }

  disableColumn(table: string, column: string) {
    return this.http.put(`${this.baseURL}/${table}/disable/${column}`, undefined);
  }
}

export interface Column {
  COLUMN_NAME: string;
}

export interface Habit {
  name: string;
  value: number;
  originalValue: number;
}

export interface Metric {
  name: string;
  value: number;
}
