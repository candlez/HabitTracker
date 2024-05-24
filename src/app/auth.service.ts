import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient;
  baseURL: string = "http://localhost:8393";

  returnPath: string = "";

  status: BehaviorSubject<boolean>;
  status$: Observable<boolean>;


  constructor(http: HttpClient) { 
    this.http = http;

    this.status = new BehaviorSubject<boolean>(false);

    // this.authenticate().subscribe(data => {
    //   if (data == "true") {
    //     this.status.next(true);
    //   } else {
    //     this.status.next(false);
    //   }
    // });

    this.status$ = this.status.asObservable();
  }

  login(username: string, password: string) {
    return this.http.put(`${this.baseURL}/login`, {username, password}, {responseType: "text", withCredentials: true});
  }

  logOut(): Observable<string> {
    return this.http.put(`${this.baseURL}/logout`, undefined, {responseType: "text", withCredentials: true});
  }

  authenticate(): Observable<string> {
    return this.http.get(`${this.baseURL}/authenticate`, {responseType: "text", withCredentials: true}).pipe(
      map(
        response => {
          if (response == "true") {
            this.status.next(true);
          } else {
            this.status.next(false);
          }
          return response;
        }
      )
    );
  }

  getReturnPath() {
    return this.returnPath;
  }

  setReturnPath(path: string) {
    this.returnPath = path;
  }

  getStatusObservable() {
    return this.status$;
  }

  setStatus(status: boolean) {
    this.status.next(status);
  }

  getStatus() {
    return this.status.getValue();
  }
}
