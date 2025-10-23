import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SignInModal } from '../sign-in-modal/sign-in-modal';
import { SignUpModal } from '../sign-up-modal/sign-up-modal';
import { StorageService } from '../../services/storage';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './user-panel.html',
  styleUrls: ['./user-panel.scss'],
})
export class UserPanel implements OnInit {
  user$: Observable<{ email: string } | null>;

  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private router: Router // 👈 додаємо router
  ) {
    this.user$ = this.storageService.getTokenObservable().pipe(
      map((token) => {
        if (token) {
          const parsedToken = jwtDecode(token) as any;
          return { email: parsedToken?.email };
        } else {
          return null;
        }
      })
    );
  }

  ngOnInit(): void {}

  signOut(): void {
    this.storageService.removeToken();
    this.router.navigate(['/']); // 👈 повертає на головну сторінку
  }

  openSignInModal(): void {
    const dialogRef = this.dialog.open(SignInModal, {
      width: '400px',
    });
  }

  openSignUpModal(): void {
    const dialogRef = this.dialog.open(SignUpModal, {
      width: '400px',
    });
  }
}
