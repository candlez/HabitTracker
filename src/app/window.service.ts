import { Injectable } from '@angular/core';

function _window() {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  getNativeWindow() {
    return _window();
  }

  isWindowLoaded() {
    return this.getNativeWindow().document.readyState === "complete";
  }
}
