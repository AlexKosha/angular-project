import { Injectable, NgZone } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(private auth: Auth, private firestore: Firestore, private zone: NgZone) {}

  register(email: string, password: string) {
    return from(this.zone.run(() => createUserWithEmailAndPassword(this.auth, email, password)));
  }
}
