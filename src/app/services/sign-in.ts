import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignInService {
  constructor(private auth: Auth) {}

  login(email: string, password: string) {
    // перетворюємо Promise у Observable, щоб підписка працювала у компоненті
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}
