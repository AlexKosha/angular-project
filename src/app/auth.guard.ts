import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from './services/storage';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.getToken();

  if (token) {
    return true;
  } else {
    router.navigate(['/']); // повертаємо на home
    return false;
  }
};
