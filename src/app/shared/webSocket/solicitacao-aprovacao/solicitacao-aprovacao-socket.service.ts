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
export class SolicitacaoAprovacaoSocketService {

  private readonly socket: Socket = io;

  constructor(
    private readonly toastMessageService: ToastMessageService,
  ) {
  }


  listenSolicitacaoAprovacao() {
    return new Observable(observer => {
      this.socket.on("new_aprovacao_requested", async (data) => {
        const solicitacao = data.solicitacao as any;

        this.toastMessageService.presentNotification({
          titulo: `Nova aprovação de pagamento de "${solicitacao.operacao.nome}"`,
          detalhe: `Aprovação de R$ ${solicitacao.custo.toFixed(2)} está pendente da sua aprovação`,
          gravidade: ToastIonicSeverityEnum.INFORMACAO,
          duracao: ToastEnum.mediumDuration,
        });
        observer.next(data);
      });
    });
  }
}
