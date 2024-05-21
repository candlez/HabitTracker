import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient;
  baseURL: string = "http://localhost:8393";

  returnPath: string = "";

  constructor(http: HttpClient) { 
    this.http = http;
  }

  login(username: string, password: string) {
    return this.http.put(`${this.baseURL}/login`, {username, password}, {responseType: "text", withCredentials: true});
  }

  authenticate(): Observable<string> {
    return this.http.get(`${this.baseURL}/authenticate`, {responseType: "text", withCredentials: true});
  }

  getReturnPath() {
    return this.returnPath;
  }

  setReturnPath(path: string) {
    this.returnPath = path;
  }
}
