import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SignInService } from '../../services/sign-in';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-sign-in-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './sign-in-modal.html',
  styleUrls: ['./sign-in-modal.scss'],
})
export class SignInModal {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SignInModal>,
    private signInService: SignInService,
    private storageService: StorageService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      this.signInService.login(email, password).subscribe({
        next: (userCredential) => {
          // Отримуємо JWT токен
          userCredential.user.getIdToken().then((token) => {
            this.storageService.setToken(token); // Зберігаємо токен
            alert('Login successful ✅');
            this.dialogRef.close();
          });
        },
        error: (err) => {
          alert(`Login error: ${err.message}`);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
