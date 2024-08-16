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
export class CargasSocketService {

  private readonly socket: Socket = io;

  constructor(
    private readonly toastMessageService: ToastMessageService,
  ) {
  }


  listenCargaStarted() {
    return new Observable(observer => {
      this.socket.on("carga_started", async data => {
        const { carga_nome, job_id, message } = data;

        this.toastMessageService.presentNotification({
          titulo: `[${job_id}] - ${carga_nome}`,
          detalhe: message,
          gravidade: ToastIonicSeverityEnum.INFORMACAO,
          duracao: ToastEnum.mediumDuration,
        });
        observer.next(data);
      });
    });
  }

  listenCargaFinish() {
    return new Observable(observer => {
      this.socket.on("carga_end", async data => {
        const { carga_nome, job_id, message, status } = data;

        const situacao = { notificacaoStatus: NotificacaoStatus.SUCESSO, toastStatus: ToastIonicSeverityEnum.SUCESSO };
        if (status != 'completed') {
          situacao.notificacaoStatus = NotificacaoStatus.ERRO;
          situacao.toastStatus = ToastIonicSeverityEnum.ERRO;
        }

        this.toastMessageService.presentNotification({
          titulo: `[${job_id}] - ${carga_nome}`,
          detalhe: message,
          gravidade: situacao.toastStatus,
          duracao: ToastEnum.mediumDuration,
        });
        observer.next(data);
      });
    });
  }
}
