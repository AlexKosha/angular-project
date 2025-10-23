import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    // при старті перевіряємо, чи є токен у localStorage
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.tokenSubject.next(savedToken);
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getToken(): string | null {
    return this.tokenSubject.value; // зручно для інтерцептора або синхронних перевірок
  }

  removeToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
