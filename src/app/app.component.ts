import { MenuController } from '@ionic/angular';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as Chart from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';

import { PreferencesService } from './shared/services/preferences/preferences.service';
import { ThemeService } from './shared/services/theme/theme.service';
import { AuthService } from './shared/services/auth/auth.service';
import { LoaderService } from './shared/services/app-loader/loader.service';
import { StorageService } from './shared/services/auth/storage.service';
import { StartSocketService } from './shared/webSocket/start/start-socket.service';
import { SYSTEM_INFO } from './../config/app.config';
import { UserService } from './shared/services/user/user.service';
import { CargasSocketService } from './shared/webSocket/cargas/cargas-socket.service';
import { MailsSocketService } from './shared/webSocket/mails/mails-socket.service';
import { AppConfig } from './app.config';
import { SolicitacaoAprovacaoSocketService } from './shared/webSocket/solicitacao-aprovacao/solicitacao-aprovacao-socket.service';
import { ToastMessageService } from './shared/services/toast/toast-message.service';
import { ChatBotService } from './shared/services/chat-bot/chat-bot.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  deferredPrompt: any;
  isDarkTheme = false;
  transacoesPendentes = 0;
  obs = new Subject();
  ref: DynamicDialogRef;
  blockUI = false;

  chartJs = Chart;
  chartLabelPlugin = ChartDataLabels;

  statusSocketColor = 'warning';
  private socketStatus = 'OFF';

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    {
      title: 'Administração', icon: 'business', children: [
        { title: 'ADM. Geral', url: '/administracao-geral', icon: 'business' },
        { title: 'ADM. Recurso', url: '/administracao-recurso', icon: 'people' },
        { title: 'ADM. T.I', url: '/administracao-ti', icon: 'terminal' },
      ]
    },
    {
      title: 'POCs', icon: 'business', children: [
        { title: 'ChatBot', url: '/poc', icon: 'person' },
      ]
    },
    {
      title: 'Usuário', icon: 'business', children: [
        { title: 'Perfil', url: '/perfil', icon: 'person' },
      ]
    },
    { title: 'Sobre', url: '/sobre', icon: 'information-circle' },
  ];

  //Prime
  visibleSidebar: boolean;
  scale: number = 16;
  scales: number[] = [12, 13, 14, 15, 16];

  //ChatBot
  newChatBot;

  constructor(
    //public readonly loaderService: LoaderService,
    public readonly dialogService: DialogService,
    private readonly preferencesService: PreferencesService,
    private readonly themeService: ThemeService,
    private readonly auth: AuthService,
    private readonly storage: StorageService,
    private readonly userService: UserService,
    private readonly startSocketService: StartSocketService,
    private readonly cargasSocketService: CargasSocketService,
    private readonly mailsSocketService: MailsSocketService,
    private readonly solicitacaoAprovacaoSocketService: SolicitacaoAprovacaoSocketService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly translateService: TranslateService,
    private readonly menuController: MenuController,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
    private readonly chatBotService: ChatBotService,
    public readonly appConfig: AppConfig,
    public readonly toastService: ToastMessageService,

  ) {
    const theme = this.preferencesService.getThemePreference();
    document.body.setAttribute('color-theme', theme);

    if (theme === 'dark') {
      this.isDarkTheme = true;
      const themeName = this.preferencesService.getThemeName() || 'soho-dark';
      this.preferencesService.setThemePreference('dark', themeName);
      this.themeService.switchTheme(themeName);
    } else {
      this.isDarkTheme = false;
      const themeName = this.preferencesService.getThemeName() || 'soho-light';
      this.preferencesService.setThemePreference('light', themeName);
      this.themeService.switchTheme(themeName);
    }

    this.listenPwaPrompt();
  }

  ngOnInit() {
    this.setupTranslation();
    this.setupWebSocket();
    this.setupPrimengConfigs();
  }

  ngAfterViewChecked() {
    this.configChatBot();
  }

  ionWillOpen() {
    //const { id: user_final_id } = this.storage.getLocalUser();

  }

  ionDidClose(): void {
    // this.obs.next();
    this.obs.complete();
  }

  /**
   * Configura o chat bot verificando se há um elemento root do chat bot no documento.
   * Se o elemento root do chat bot for encontrado, ele é removido após configurar o chat bot.
   * Lembre-se de adicionar o ID do projeto no script da Automation no index.html
   */
  configChatBot() {
    const rootChatBot = document.body.lastChild;
    if (rootChatBot && rootChatBot.nodeName == 'DIV' && rootChatBot.textContent.toLowerCase().includes('conversation')) {
      this.chatBotService.setChatBot(rootChatBot.firstChild);
      rootChatBot.remove();
    }
  }

  listenPwaPrompt() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

  toggleDetails(p) {
    if (p.showDetails) {
      p.showDetails = false;
      p.icon = 'ios-arrow-down';
    } else {
      p.showDetails = true;
      p.icon = 'ios-arrow-up';
    }
  }

  async toggleThemes(event) {
    this.visibleSidebar = true;
    const { isEnabled, isOpen } = this.menuController;

    if (await isEnabled() && await isOpen()) {
      await this.menuController.close();
    }
  }

  logout() {
    this.auth.logout();
  }

  setupWebSocket() {
    this.startSocketService.listenConneciton()
      .subscribe(data => {
        const { connection } = data as any;
        console.log(`Socket connection: ${connection}`);
        this.socketStatus = connection;
      });

    this.cargasSocketService.listenCargaStarted()
      .subscribe(data => {
      });

    this.cargasSocketService.listenCargaFinish()
      .subscribe(data => {
      });

    this.mailsSocketService.listenMailFinish()
      .subscribe(data => {
      });

    this.solicitacaoAprovacaoSocketService.listenSolicitacaoAprovacao()
      .subscribe(data => {
      });
  }

  setupTranslation() {
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.use('pt-BR');
    this.translateService
      .get('primeng')
      .subscribe(res => {
        this.primengConfig.setTranslation(res);
      });
  }

  sincronizar() {
    console.log(this.newChatBot);
    /*
        const { id } = this.storage.getLocalUser();
        this.startSocketService
          .emitNewConnection(id);
        this.userService.findById(id)
          .subscribe(data => {
            this.storage.setCompleteLocalUser(data);
          });
          */
  }

  getSocketConexao(): string {

    switch (this.socketStatus) {
      case 'ON':
        this.statusSocketColor = 'success';
        return this.socketStatus;

      case 'OFF':
        this.statusSocketColor = 'warning';
        return this.socketStatus;

      default:
        this.statusSocketColor = 'danger';
        return 'ERRO';
    }
  }

  getSystemInfo() {
    return SYSTEM_INFO;
  }

  setupPrimengConfigs() {
    this.primengConfig.ripple = true;
    this.applyScale();
  }

  changeTheme(event: Event, theme: string, dark: boolean) {
    const mode = dark ? 'dark' : 'light';
    document.body.setAttribute('color-theme', mode);
    this.themeService.switchTheme(theme);
    this.preferencesService.setThemePreference(mode, theme);
    this.appConfig.theme = theme;
    this.appConfig.dark = dark;
    event.preventDefault();
  }

  decrementScale() {
    this.scale--;
    this.applyScale();
  }

  incrementScale() {
    this.scale++;
    this.applyScale();
  }

  applyScale() {
    document.documentElement.style.fontSize = this.scale + 'px';
  }

  changeBackground({ checked }) {
    const wallBackgroundElements = this.elementRef.nativeElement.querySelectorAll('.wall-background');
    wallBackgroundElements.forEach((element) => {
      if (checked) {
        this.renderer.addClass(element, 'gradient');
      } else {
        this.renderer.removeClass(element, 'gradient');
      }
    });
  }

  installPwa() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then(result => {
      this.deferredPrompt = null;
    });
  }
}
