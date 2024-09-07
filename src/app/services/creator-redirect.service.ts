import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatorRedirectService {
  private url!: string;

  constructor() { }

  getURL(): string {
    return this.url;
  }

  setURL(url: string): void {
    this.url = url;
  }
}
