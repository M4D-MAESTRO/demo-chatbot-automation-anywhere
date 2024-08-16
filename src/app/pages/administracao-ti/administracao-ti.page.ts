import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/auth/storage.service';
import { ToastMessageService } from 'src/app/shared/services/toast/toast-message.service';
import { ExternalRedirect } from 'src/app/shared/utils/ExternalLink';
import { API_CONFIG } from 'src/config/api.config';
import { Role } from 'src/app/shared/constants/role.constants';
import { ToastEnum, ToastPrimeSeverityEnum } from 'src/app/shared/constants/toast.constant';

@Component({
  selector: 'app-administracao-ti',
  templateUrl: './administracao-ti.page.html',
  styleUrls: ['./administracao-ti.page.scss'],
})
export class AdministracaoTiPage implements OnInit {

  constructor(
    private readonly storage: StorageService,
    private readonly toastService: ToastMessageService,
  ) { }
  //TODO - PASSANDO TOKEN NO CABEÇALHO PARA AUTENTICAR
  ngOnInit() {
  }

  openSwagger() {
    const link = `${API_CONFIG.baseURL}/api`;
    ExternalRedirect.externalLinkHandle(link);
  }

  openBullDashboard() {
    const { refresh_token, perfil_nome } = this.storage.getLocalUser();

    if (perfil_nome != Role.ADMIN_TI) {
      this.toastService.presentToast({
        detalhe: `Apenas '${Role.ADMIN_TI}' podem acessar esta funcionalidade`,
        titulo: `Não autorizado`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }

    const link = `${API_CONFIG.baseURL}/queues/?authorization=${refresh_token}`;
    ExternalRedirect.externalLinkHandle(link);
  }

  openStatus() {
    const { perfil_nome } = this.storage.getLocalUser();

    if (perfil_nome != Role.ADMIN_TI) {
      this.toastService.presentToast({
        detalhe: `Apenas '${Role.ADMIN_TI}' podem acessar esta funcionalidade`,
        titulo: `Não autorizado`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }

    const link = `${API_CONFIG.baseURL}/api/status`;
    ExternalRedirect.externalLinkHandle(link);
  }

}
