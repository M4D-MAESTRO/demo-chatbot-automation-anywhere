import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { from, Observable, Subscription, throwError, } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';

import { ToastEnum, ToastPrimeSeverityEnum } from '../constants/toast.constant';
import { LoaderService } from '../services/app-loader/loader.service';
import { API_CONFIG } from 'src/config/api.config';
import { AuthService } from '../services/auth/auth.service';
import { ToastMessageService } from '../services/toast/toast-message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private timeoutTiming = 10000;
  private subscriptions = new Subscription();
  private authorizationsCount = 0;

  constructor(
    private readonly alertContr: AlertController,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly menu: MenuController,
    private readonly toastMessageService: ToastMessageService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let gotError = false;
    let convertedMessage;
    let originalResponse;

    return next
      .handle(req)
      .pipe(
        catchError((response) => {
          originalResponse = response;
          const { statusText } = response;
          if (statusText === 'Unknown Error') {
            return throwError(() => new Error('Timeout'));
          }
          const { status } = response;

          if (response.error instanceof Blob) {
            response.error = JSON.parse(response.error.text());
          }

          const { message } = response.error;
          convertedMessage = this.convertErrorList(message);

          switch (Number(status)) {
            case 400:
              this.handle400(convertedMessage);
              break;

            case 403:
              this.handle403(convertedMessage);
              break;

            case 401:
              this.handle401(convertedMessage);
              break;

            case 422:
              this.handle422(convertedMessage);
              break;

            case 404:
              this.handle404(convertedMessage);
              break;

            case 409:
              this.handle409(convertedMessage);
              break;

            default:
              this.handleDefaultError(convertedMessage, status);
          }
          gotError = true;
          return throwError(() => originalResponse);
        }),
        timeout(this.timeoutTiming),
        catchError((response) => {
          if (response !== 'Timeout') {
            return throwError(() => originalResponse);;
          }
          const e = `Tempo de espera excedido: ${API_CONFIG.baseURL}`;
          this.handle408(e);
          gotError = true;
          return throwError(() => originalResponse);
        }),
        finalize(() => {
          if (!gotError) {
            this.authorizationsCount = 0;
          }
        }),
      ) as Observable<HttpEvent<any>>;
  }


  handle400(error: string) {
    this.toastMessageService.presentToast({
      titulo: '[400] - Atenção',
      detalhe: error,
      gravidade: ToastPrimeSeverityEnum.ATENCAO,
      duracao: ToastEnum.mediumDuration,
    });
  }

  handle401(error: string) {
    if (error.toLowerCase().includes('inexistente')) {
      this.toastMessageService.presentToast({
        titulo: '[401] - Acesse novamente',
        detalhe: 'É preciso autenticar-se novamente',
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
        duracao: ToastEnum.longDuration,
      });

      this.menu.close();
      this.authService.logout();
      this.router.navigateByUrl('login');
    } else {
      this.toastMessageService.presentToast({
        titulo: '[401] - Não autorizado',
        detalhe: error,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
        duracao: ToastEnum.mediumDuration,
      });
    }
  }

  handle403(error: string) {
    this.toastMessageService.presentToast({
      titulo: '[403] - Não autorizado',
      detalhe: error,
      gravidade: ToastPrimeSeverityEnum.ATENCAO,
      duracao: ToastEnum.mediumDuration,
    });
    if (
      error.toLowerCase().includes('inexistente')
      || error.toLowerCase().includes('suspenso')
      || error.toLowerCase().includes('inválido')) {
      this.authService.logout();
      this.router.navigateByUrl('login');
    }

    this.authorizationsCount++;

    if (this.authorizationsCount >= 5) {
      try {
        const sub = this.authService.refreshToken()
          .subscribe({
            next: async (response) => {
              await this.authService.loginSucesso(response);
            },
            error: (error) => {
              this.menu.enable(true);
              this.menu.close();
              this.menu.enable(false);
              this.authService.logout();
              this.router.navigateByUrl('login');
            }
          });
        this.subscriptions.add(sub);
      } catch (e) {
        this.menu.enable(true);
        this.menu.close();
        this.menu.enable(false);
        this.router.navigateByUrl('login');
      }
      this.authorizationsCount = 0;
    }
  }

  handle404(error: string) {
    this.toastMessageService.presentToast({
      titulo: '[404] - Não encontrado',
      detalhe: error,
      gravidade: ToastPrimeSeverityEnum.ATENCAO,
      duracao: ToastEnum.mediumDuration,
    });
  }

  handle408(error: string) {
    this.toastMessageService.presentToast({
      titulo: '[408] - Tempo de espera excedido',
      detalhe: error,
      gravidade: ToastPrimeSeverityEnum.ERRO,
      duracao: ToastEnum.longDuration,
    });

  }
  handle409(error: string) {
    this.toastMessageService.presentInfoOverlay({
      header: 'Atenção!',
      closable: true,
      modal: true,
      data: error,
      width: '50%',
      footer: '.',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  async handle422(error: string) {
    this.toastMessageService.presentToast({
      titulo: '[422] - Não processável',
      detalhe: error,
      gravidade: ToastPrimeSeverityEnum.ERRO,
      duracao: ToastEnum.longDuration,
    });
  }

  handleDefaultError(message: string, status = 500) {
    this.toastMessageService.presentToast({
      gravidade: ToastPrimeSeverityEnum.ERRO,
      detalhe: message,
      duracao: ToastEnum.longDuration,
      titulo: status.toString(),
    });

  }

  private async createAlert(error) {
    let titulo = error.error;
    let message = error.msg;

    if (!titulo) {
      titulo = 'Falha';
    }

    if (!message) {
      message = error.message;
    }

    const alert = await this.alertContr.create({
      header: error.status + ': ' + titulo,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
        },
      ],
    });

    await alert.present();
  }

  private convertErrorList(error: any) {

    if (!error.length || !Array.isArray(error)) {
      return error;
    }

    let errorList = '';
    error.forEach(e => {
      errorList = errorList.concat(`- ${e}`);
      errorList = errorList.concat('\n')
    });
    return errorList;
  }

  private loadBlock(isBlock = false): void {
    const value = isBlock ? 'none' : 'all';
    document.documentElement.style.setProperty('--load-block', value);
  }
}

export const errorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};