import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = environment.API_BASE_URL;

  returnPath: BehaviorSubject<string> = new BehaviorSubject<string>("/dashboard");
  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(public http: HttpClient) { 
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
          if (response === "true") {
            this.status.next(true);
          } else {
            this.status.next(false);
          }
          return response;
        }
      ),
      catchError((error: HttpErrorResponse) => {
        this.status.next(false);
        if (error.status === 401) {
          return of("false");
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getReturnPathObservable(): Observable<string> {
    return this.returnPath.asObservable();
  }
  
  setReturnPath(path: string): void {
    this.returnPath.next(path);
  }

  getReturnPath(): string {
    return this.returnPath.getValue();
  }

  getStatusObservable(): Observable<boolean> {
    return this.status.asObservable();
  }

  setStatus(status: boolean): void {
    this.status.next(status);
  }

  getStatus(): boolean {
    return this.status.getValue();
  }
}
