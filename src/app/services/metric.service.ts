import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricService {
  baseURL: string = environment.API_BASE_URL;

  constructor(public http: HttpClient) { }

  getDateString(date: Date): string {
    var local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return local.toISOString().split('T')[0];
  }

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>(`${this.baseURL}/metrics`)
  }

  getMetric(name: string): Observable<Metric> {
    return this.http.get<Metric>(`${this.baseURL}/metrics/${name}`);
  }

  createMetric(name: string, description?: string, enabled?: boolean): Observable<string> {
    const body: object = {
      ...(description !== undefined && {description}),
      ...(enabled !== undefined && {enabled})
    }
    return this.http.post(`${this.baseURL}/metrics/${name}`, body, {responseType: "text"});
  }

  editMetric(oldName: string, newName?: string, description?: string, enabled?: boolean): Observable<string> {
    const body: object = {
      ...(newName !== undefined && {newName}),
      ...(description !== undefined && {description}),
      ...(enabled !== undefined && {enabled})
    }
    return this.http.put(`${this.baseURL}/metrics/${oldName}`, body, {responseType: "text"});
  }

  deleteMetric(name: string): Observable<string> {
    return this.http.delete(`${this.baseURL}/metrics/${name}`, {responseType: "text"});
  }

  getDate(date: string): Observable<MetricDate> {
    return this.http.get<MetricDate>(`${this.baseURL}/metrics/dates/${date}`);
  }

  getValue(name: string, date: string): Observable<MetricDateValuePair> {
    return this.http.get<MetricDateValuePair>(`${this.baseURL}/metrics/dates/${name}/${date}`);
  }

  setValue(name: string, date: string, value: boolean): Observable<string> {
    return this.http.put(`${this.baseURL}/metrics/dates/${name}/${date}`, {value}, {responseType: "text"});
  }

  getValueRange(name: string, start: string, end: string): Observable<MetricDateValuePair[]> {
    return this.http.get<MetricDateValuePair[]>(`${this.baseURL}/metrics/dates/${name}/from/${start}/to/${end}`);
  }
}

export interface Metric {
  name: string,
  description: string,
  enabled: boolean
}

export interface MetricDate {
  date: string
}

export interface MetricDateValuePair {
  date: string,
  value: number | null;
}
