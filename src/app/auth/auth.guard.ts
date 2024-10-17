import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { take, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user.pipe(take(1), map(user => {
        const isAuth = !!user;
        if (isAuth) {
            return true;
        } else {
            return router.createUrlTree(['/login']);
        }
    }));
};
