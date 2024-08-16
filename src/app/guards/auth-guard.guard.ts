import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ToastEnum, ToastPrimeSeverityEnum } from '../shared/constants/toast.constant';
import { StorageService } from '../shared/services/auth/storage.service';
import { ToastMessageService } from '../shared/services/toast/toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly toastMessageService: ToastMessageService,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserRole(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    const url = segments.map(s => `/${s}`).join('');

    return this.checkAuthState(url).pipe(take(1));
  }

  private checkAuthState(redirect: string): Observable<boolean> {
    return this.storageService.isLogedInObs().pipe(
      tap(is => {
        if (!is) {
          this.toastMessageService.presentToast({
            titulo: '401 - Não autenticado',
            detalhe: 'Por favor, realize login',
            gravidade: ToastPrimeSeverityEnum.ATENCAO,
            duracao: ToastEnum.mediumDuration,
          });
          this.router.navigate(['/login'], { queryParams: { redirect } })
        }
      })
    )
  }

  private checkUserRole(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.storageService.isLogedIn()) {
      /* const isAdmin = this.storageService.getUserIsAdmin();
       if (isAdmin) {
         return true;
       }*/

      const userRole = this.storageService.getRole();

      if ((route.data.role && route.data.role.indexOf(userRole) === -1)) {
        this.toastMessageService.presentToast({
          titulo: '403 - Não autorizado',
          detalhe: `Você não possui autorização para realizar esta operação.`,
          gravidade: ToastPrimeSeverityEnum.ATENCAO,
          duracao: ToastEnum.mediumDuration,
        });
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    this.toastMessageService.presentToast({
      titulo: '401 - Não autenticado',
      detalhe: 'Por favor, realize login',
      gravidade: ToastPrimeSeverityEnum.ATENCAO,
      duracao: ToastEnum.mediumDuration,
    });
    this.router.navigate(['/login']);
    return false;
  }

}
