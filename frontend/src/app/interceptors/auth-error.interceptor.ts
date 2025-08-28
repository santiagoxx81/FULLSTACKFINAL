import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        // limpa e força login novamente
        localStorage.removeItem('token');
        localStorage.removeItem('perfil');
        router.navigate(['/login'], { queryParams: { expired: 1 } });
      }
      return throwError(() => err);
    })
  );
};