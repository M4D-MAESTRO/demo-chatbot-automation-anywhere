import { MODE, SYSTEM_INFO } from './../../../config/app.config';


/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { Device } from '@capacitor/device';

import { Subscription } from 'rxjs';

import { AuthService } from './../../shared/services/auth/auth.service';
import { PreferencesService } from '../../shared/services/preferences/preferences.service';
import { ThemeService } from './../../shared/services/theme/theme.service';
import { changeBaseURL } from './../../../config/api.config';
import { CredenciaisDto } from './../../shared/interfaces/authentication/credencias.dto';
import { ToastMessageService } from './../../shared/services/toast/toast-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  credenciais: CredenciaisDto = {
    username: 'super-admin@dominio.com',
    password: '123',
  };
  features: any[] = [];

  private subscriptions = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly menu: MenuController,
    private readonly auth: AuthService,
    private readonly preferencesService: PreferencesService,
    private readonly themeService: ThemeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastMessageService,
  ) { }

  ngOnInit() {
    document.body.setAttribute('color-theme', 'dark');
    this.themeService.switchTheme('soho-light');
    this.menu.close();

    this.features = [
      { title: 'Core', image: 'assets/imgs/login/core.jpg', text: 'Feature 1' },
      { title: 'Conds', image: 'assets/imgs/login/conds.jpg', text: 'Feature 2' },
      { title: 'Custom', image: 'assets/imgs/login/custom.jpg', text: 'Feature 3' }
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ionViewWillEnter() {
    document.body.setAttribute('color-theme', 'dark');
    this.themeService.switchTheme('soho-dark');
    this.menu.close();
    this.menu.enable(false);
  }

  async ionViewDidEnter() {

    try {

      const sub = this.auth.refreshToken()
        .subscribe(async (response) => {
          await this.auth.loginSucesso(response);
          this.router.navigateByUrl('home');
        }, error => {
          this.menu.enable(true);
          this.menu.close();
          this.menu.enable(false);
          this.auth.logout();
        });
      this.subscriptions.add(sub);
    } catch (e) {
      this.menu.enable(true);
      this.menu.close();
      this.menu.enable(false);
    }
  }

  ionViewWillLeave() {
    const theme = this.preferencesService.getThemePreference();
    document.body.setAttribute('color-theme', theme);
    if (theme === 'dark') {
      const themeName = this.preferencesService.getThemeName() || 'soho-dark';
      this.preferencesService.setThemePreference('dark', themeName);
      this.themeService.switchTheme(themeName);
    } else {
      const themeName = this.preferencesService.getThemeName() || 'soho-light';
      this.preferencesService.setThemePreference('light', themeName);
      this.themeService.switchTheme(themeName);
    }

    this.menu.enable(true);
  }



  async login() {

    if (this.controlLoginButton()) {
      return;
    }

    if (this.credenciais.username.trim().toUpperCase().includes('URL:') && MODE.CURRENT_MODE != 'PROD') {
      this.forceNewUrl();
      return;
    }

    const { identifier: uuid } = await Device.getId();
    //this.credenciais.current_machine_id = uuid;
    const sub = this.auth.fakeLogin()
      .subscribe({
        next: response => {
          const url =
            this.activatedRoute.snapshot.queryParamMap.get('redirect') ||
            'home';
          this.router.navigateByUrl(url);
        }
      });

    /*
  const sub = this.auth.authenticate(this.credenciais)
    .subscribe(async (response) => {
      await this.auth.loginSucesso(response);
      const url =
        this.activatedRoute.snapshot.queryParamMap.get('redirect') ||
        'home';
      this.router.navigateByUrl(url);
    },
      error => { });
      */

    this.subscriptions.add(sub);
  }

  async goToRequestReset() {
    this.router.navigateByUrl('password-reset');
  }

  setFocus(nextElement) {
    nextElement.setFocus();
  }

  controlLoginButton(): boolean {
    if (this.credenciais.username && this.credenciais.username) {
      return false;
    }
    return true;
  }

  getSystemInfo() {
    return SYSTEM_INFO;
  }

  private forceNewUrl() {
    const { username } = this.credenciais;
    const newUrl = username.trim().toUpperCase().split('URL:').pop().trim();
    changeBaseURL(newUrl);
  }

}
