import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from '../../../config/api.config';
import { StorageService } from '../services/auth/storage.service';
import { LoaderService } from '../services/app-loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly storage: StorageService,
  ) { }

  

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let response;

    const localUser = this.storage.getLocalUser();
    const N = API_CONFIG.baseURL.length;
    const reqToApi = req.url.substring(0, N) === API_CONFIG.baseURL;

    if (localUser && reqToApi) {

      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localUser.refresh_token),
      });
      response = authReq;
    } else {
      response = req;
    }


    return next.handle(response);
  }


}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
