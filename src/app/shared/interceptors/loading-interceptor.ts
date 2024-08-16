import { MODE } from './../../../config/app.config';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HTTP_INTERCEPTORS,
    HttpResponse,
    HttpEventType,
} from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { EMPTY, from, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { API_CONFIG } from '../../../config/api.config';
import { StorageService } from '../services/auth/storage.service';
import { LoaderService } from '../services/app-loader/loader.service';
import { ToastEnum } from '../constants/toast.constant';

@Injectable({
    providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {

    defaultLoaderId = 'main-loader';
    defaultDuration = MODE.CURRENT_MODE == 'PROD'? ToastEnum.longDuration: ToastEnum.shortDuration;

    constructor(
        private readonly toastController: ToastController,
        private readonly loadingController: LoadingController,
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.finalizeLoader();
        if (!req.url.toLowerCase().includes('http')) {
            return next.handle(req);
        }
        
        return next.handle(req)
            .pipe(
                tap(async (event) => {
                    if (event instanceof HttpResponse) {
                        await this.finalizeLoader();
                    } else {
                        await this.startLoader();
                        if (req.method.toUpperCase().includes('POST') ||
                            req.method.toUpperCase().includes('PATCH') ||
                            req.method.toUpperCase().includes('PUT')) {
                            await this.showLoadingMessage();
                        }
                    }

                }),
            )
            .pipe(
                finalize(async () => {
                    let flag = true;
                    do {
                        const top = await this.loadingController.getTop();
                        await new Promise(resolve =>
                            setTimeout(() => resolve(top ? false : true), 1000))
                        if (top) {
                            await this.finalizeLoader();
                        } else {
                            flag = false;
                            break;
                        }
                    } while (flag);
                    await this.finalizeLoader();
                }),
            );

    }

    async showLoadingMessage() {
        const toast = await this.toastController.create({
            message: `Aguarde um momento`,
            id: this.defaultLoaderId,
            duration: this.defaultDuration,
        });
        await toast.present();
    }

    async dimissMessage() {
        try {
            const topOverlay = await this.toastController.getTop();
            if (topOverlay) {
                await topOverlay.dismiss();
                await this.toastController.dismiss('', '', this.defaultLoaderId);
            }
        } catch (e) { }
    }

    async startLoader() {
        const topOverlay = await this.loadingController.getTop();
        if (!topOverlay) {
            const overlay = await this.loadingController.create({
                spinner: 'circular',
                translucent: true,
                id: this.defaultLoaderId,
                duration: this.defaultDuration,
            });
            await overlay.present();
        } else {
            await topOverlay.dismiss();
        }
    }

    async finalizeLoader() {

        try {
            await this.dimissMessage();
        } catch (e) { }

        try {
            const topOverlay = await this.loadingController.getTop();
            if (topOverlay) {
                await topOverlay.dismiss();
                await this.loadingController.dismiss('', '', this.defaultLoaderId);
            }
        } catch (e) { }
    }
}

export const loadingInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
};