import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GenericDialogComponent } from '../../components/utils/generic-dialog/generic-dialog.component';
import { ToastEnum } from '../../constants/toast.constant';
import { ToastConfirmationMessageDto, ToastMessageDto, ToastNotificacoDto } from '../../interfaces/others/toast-message.dto';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  ref: DynamicDialogRef;

  constructor(
    private readonly toastService: MessageService,
    private readonly toastController: ToastController,
    private readonly dialogService: DialogService,
  ) { }


  presentToast(
    toast: ToastMessageDto,
    key = 'main',
  ) {
    this.toastService.clear();
    this.toastService.add({
      severity: toast.gravidade,
      summary: toast.titulo,
      detail: toast.detalhe,
      life: toast.duracao,
      key,
    });
  }

  clearToast() {
    this.toastService.clear();
  }

  async presentNotification(toast: ToastNotificacoDto,) {
    const toastOverlay = await this.toastController.create({
      header: toast.titulo,
      message: toast.detalhe,
      duration: toast.duracao,
      color: toast.gravidade,
      position: 'top',
      keyboardClose: true,
      translucent: true,
    });
    toastOverlay.present();
  }

  presentInfoOverlay(config: DynamicDialogConfig) {
    this.ref = this.dialogService.open(GenericDialogComponent, config);
  }

  presentConfirmationOverlay(
    toast: ToastConfirmationMessageDto,
    key = 'confirmation-overlay',
  ) {
    this.toastService.add({
      key,
      sticky: true,
      severity: toast.gravidade,
      summary: toast.titulo,
      detail: toast.detalhe,
      icon: toast.icon || 'pi pi-exclamation-triangle',
    });
  }

  closeConfirmationOverlay() {
    this.toastService.clear('confirmation-overlay');
  }

  closeOverlay() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
