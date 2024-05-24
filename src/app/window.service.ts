import { Injectable } from '@angular/core';

function window() {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  getNativeWindow() {
    return window();
  }
}
