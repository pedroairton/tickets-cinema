import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('auth_token');

  if (!token) {
    return false;
  }
  
  return true;
};
