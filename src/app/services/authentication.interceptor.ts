import { HttpInterceptorFn } from '@angular/common/http';

export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const user = JSON.parse(localStorage.getItem('user')!);
  if (user && user.token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Token ${user.token}`
      }
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
