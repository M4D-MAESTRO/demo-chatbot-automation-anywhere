import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ToastMessageService } from '../../toast/toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectUtilsService {

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly router: Router,
    private readonly toastService: ToastMessageService,
    private readonly modal: ModalController,
  ) { }

  doRedirectWithConfirmation(url: string, pageName: string): boolean {
    let decision = false;
    this.confirmationService.confirm({
      message: `Você está preste a ser redirecionado para página de ${pageName}`,
      header: `Aviso de redirecionamento`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modal.dismiss();
        decision = true;
        this.router.navigateByUrl(url);
      },
      reject: (type) => {
        this.toastService.clearToast();
      }
    });

    return decision;
  }
}
