import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';

import { io } from '../SocketStart';
import { NotificacaoStatus, NotificacaoTipoEnum } from '../../constants/notificacao.constant';
import { ToastEnum, ToastIonicSeverityEnum, } from '../../constants/toast.constant';
import { ToastMessageService } from '../../services/toast/toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class MailsSocketService {


  private readonly socket: Socket = io;

  constructor(
    private readonly toastMessageService: ToastMessageService,
  ) {
  }


  listenMailFinish() {
    return new Observable(observer => {
      this.socket.on("send-email_finished", async data => {
        console.log('EMAIL SEND SOCKET');
        const { subject, job_id, message, status, } = data;

        const situacao = { notificacaoStatus: NotificacaoStatus.SUCESSO, toastStatus: ToastIonicSeverityEnum.SUCESSO };
        if (status != 'completed') {
          situacao.notificacaoStatus = NotificacaoStatus.ERRO;
          situacao.toastStatus = ToastIonicSeverityEnum.ERRO;
        }

        this.toastMessageService.presentNotification({
          titulo: `[${job_id}] - ${subject.substring(0, 10)}...`,
          detalhe: message,
          gravidade: situacao.toastStatus,
          duracao: ToastEnum.mediumDuration,
        });
        observer.next(data);
      });
    });
  }
}
