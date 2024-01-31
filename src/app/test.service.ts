import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  testValue;

  constructor() {
    this.testValue = 5;
  }

  test() {
    console.log("Service Executed");
  }
}
