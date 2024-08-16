import { ModalController, Platform } from '@ionic/angular';
import { ComponentRef, ComponentProps } from '@ionic/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';
import { Camera } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';

import { PageOrder } from './../../shared/constants/page.constant';
import { BasicNotificacaoDto } from './../../shared/interfaces/others/notificacao.dto';
import { PageableDto } from './../../shared/interfaces/others/pageable.dto';
import { UserDto } from './../../shared/interfaces/users/user.dto';
import { StorageService } from './../../shared/services/auth/storage.service';
import { NotificacaoService } from './../../shared/services/notificacao/notificacao.service';
import { UserService } from './../../shared/services/user/user.service';
import { NotificacaoUtils } from './../../shared/utils/NotificacaoUtils';
import { ToastMessageService } from './../../shared/services/toast/toast-message.service';
import { NotificacaoStatus } from './../../shared/constants/notificacao.constant';
import { FuncionarioProfileComponent } from './../../shared/components/adm-recurso-module/funcionarios/funcionario-profile/funcionario-profile.component';
import { SimpleDashboardDto } from './../../shared/interfaces/adm-financeiras/dashboards/dashboard.dto';
import { PreferencesService } from './../../shared/services/preferences/preferences.service';
import { condominio_reserva_arvores4 } from './../../shared/constants/system.constant';
import { TipoUsuarioEnum } from './../../shared/constants/tipo-user.constant';
import { EmailService } from './../../shared/services/comunicacao/emails/email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  user: UserDto

  notificacoes: BasicNotificacaoDto[] = [];
  itemsNotificacao: MenuItem[];

  colaboradores: PageableDto<UserDto>;
  moradores: PageableDto<UserDto>;
  itemsUsers: MenuItem[];

  simplesDash: SimpleDashboardDto;
  inAndOutDash: EChartsOption;

  private lojaId = condominio_reserva_arvores4;
  private subscriptions = new Subscription();

  constructor(
    private readonly route: Router,
    private readonly storage: StorageService,
    private readonly usersService: UserService,
    private readonly notificacaoService: NotificacaoService,
    private readonly toastService: ToastMessageService,
    private readonly modal: ModalController,
    private readonly preferencesService: PreferencesService,
    private readonly emailService: EmailService,
    private readonly alertController: AlertController,
    private readonly platform: Platform,
  ) { }

  ngOnInit() {
    this.itemsNotificacao = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Atualizar',
            icon: 'pi pi-fw pi-refresh',
            command: () => {
              this.loadNotificacoes();
            }
          },
        ]
      }];

    this.itemsUsers = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Atualizar',
            icon: 'pi pi-fw pi-refresh',
            command: () => {
              this.loadColaboradores();
            }
          },
        ]
      }];

    this.user = this.storage.getCompleteLocalUser();
    if (false) {
      this.lojaId = this.user.loja.id;
    }

    /*
    this.loadColaboradores();
    this.loadNotificacoes();
    this.loadMoradores();
    */
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async ionViewDidEnter() {
    const platforms = this.platform.platforms();
    if (platforms.includes('android') || platforms.includes('ios')) {
      await this.requestCameraPermission();
      await this.requestFilePermission();
    }
  }

  loadNotificacoes() {
    const sub = this.notificacaoService.listSelf()
      .subscribe((notificacoes) => {
        this.notificacoes = notificacoes
      });
    this.subscriptions.add(sub);
  }

  loadColaboradores(page: number = 1) {
    const sub = this.usersService.listUsers(
      {
        loja_id: this.lojaId,
      },
      { order: PageOrder.ASC, page, take: 10 }
    )
      .subscribe(users => {
        users.data = users.data.filter(u => u.id !== this.user.id);
        this.colaboradores = users as any;
      });
    this.subscriptions.add(sub);
  }

  paginarColaborador(event) {
    const page = event.page + 1;
    this.loadColaboradores(page);
  }

  loadMoradores(page: number = 1) {
    const sub = this.usersService.listUsers(
      {
        loja_id: this.lojaId,
        tipo_usuario: TipoUsuarioEnum.USUARIO,
      },
      { order: PageOrder.ASC, page, take: 10 }
    )
      .subscribe(users => {
        users.data = users.data.filter(u => u.id !== this.user.id);
        this.moradores = users as any;
      });
    this.subscriptions.add(sub);
  }

  paginarMorador(event) {
    const page = event.page + 1;
    this.loadMoradores(page);
  }


  getNotificacaoIcon(n: BasicNotificacaoDto) {
    return NotificacaoUtils.getIconByTipo(n.tipo);
  }

  getNotificacaoColor(status: string) {
    switch (status) {
      case NotificacaoStatus.AVISO:
        return 'text-yellow-500';

      case NotificacaoStatus.ERRO:
        return 'text-pink-500';

      case NotificacaoStatus.INFO:
        return 'text-blue-500';

      case NotificacaoStatus.SUCESSO:
        return 'text-green-500';

      default:
        return 'text-blue-500';
    }
  }


  openPerfil() {
    this.showModal(FuncionarioProfileComponent, { user: this.user, enableMessageAndNotification: true });
  }

  openMembro(user: UserDto) {
    this.showModal(FuncionarioProfileComponent, { user });
  }

  goToPDV() {
    this.route.navigateByUrl('pdv');
  }

  goToPrestacaoServico() {
    // this.route.navigateByUrl('prestacao-servico');
  }

  goToAssinatura() {
    // this.route.navigateByUrl('assinatura');
  }

  goToSendEmail(user: UserDto) {
    this.emailService.addEmailToList(user.email);
    const extras: NavigationExtras = {
      queryParams: {
        tab: 'email-send',
      },
    };
    this.route.navigate(['/comunicacao-email'], extras);

  }

  getTheme() {
    const theme = this.preferencesService.getThemePreference();
    this.inAndOutDash.backgroundColor = this.preferencesService.surfaceBackground;
    return theme == 'dark' ? theme : undefined;
  }

  async requestCameraPermission() {
    try {
      const permissions = await Camera.checkPermissions();
      console.log(`Permissões à câmera: ${permissions}`);
      if (permissions.camera != 'granted' || permissions.photos != 'granted') {
        const alert = await this.alertController.create({
          header: 'Permissões à câmera e galeria',
          message: 'Necessário para realizar operações com anexo de encomendas',
          buttons: ['OK'],
        });

        await alert.present();
        await alert.onDidDismiss();
        await Camera.requestPermissions({
          permissions: ['camera', 'photos']
        });
      }

    } catch (e) {
      console.error(`Não foi possível pedir permissão à câmera/fotos`);
      console.error(e);
    }
  }

  async requestFilePermission() {
    try {
      const permissions = await Filesystem.checkPermissions();
      console.log(`Permissões à arquivos: ${permissions}`);
      if (permissions.publicStorage != 'granted') {
        const alert = await this.alertController.create({
          header: 'Permissões à arquivos',
          message: 'Necessário para poder salvar arquivos e comprovantes',
          buttons: ['OK'],
          backdropDismiss: false,

        });

        await alert.present();
        await alert.onDidDismiss();
        await Filesystem.requestPermissions();
      }

    } catch (e) {
      console.error(`Não foi possível pedir permissão aos arquivos`);
      console.error(e);
    }
  }

  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modal.create({
      component,
      backdropDismiss: false,
      cssClass: 'modal-size-100',
      componentProps,
    });

    modal.onDidDismiss().then((data) => {
      const { data: updatedUser } = data;

      if (updatedUser) {
        this.user = this.storage.getCompleteLocalUser();
      }

    });

    return await modal.present();
  }

}