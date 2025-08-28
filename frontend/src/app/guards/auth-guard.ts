import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');   // salvo no login
  const perfil = localStorage.getItem('perfil'); // 'ADMIN' | 'PROFESSOR' | 'ALUNO'
  const roles = (route.data?.['roles'] as string[] | undefined) ?? [];

  // precisa estar logado
  if (!token) {
    // redireciona e guarda destino para pós-login
    return router.createUrlTree(['/login'], { queryParams: { redirectTo: state.url } });
  }

  // se rota exigir perfil específico, valida
  if (roles.length && (!perfil || !roles.includes(perfil))) {
    // sem permissão → manda para login (ou uma página 403 se preferir)
    return router.createUrlTree(['/login']);
  }

  return true;
};