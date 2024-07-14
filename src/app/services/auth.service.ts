import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient;
  baseURL: string = environment.API_BASE_URL;

  returnPath: BehaviorSubject<string>;
  returnPath$: Observable<string>;

  status: BehaviorSubject<boolean>;
  status$: Observable<boolean>;


  constructor(http: HttpClient) { 
    this.http = http;

    this.returnPath = new BehaviorSubject<string>("/dashboard");
    this.returnPath$ = this.returnPath.asObservable();

    this.status = new BehaviorSubject<boolean>(false);
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

  getReturnPathObservable() {
    return this.returnPath$;
  }
  
  setReturnPath(path: string) {
    this.returnPath.next(path);
  }

  getReturnPath() {
    return this.returnPath.getValue();
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
