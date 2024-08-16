import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';

import { PasswordService } from 'src/app/shared/services/auth/password.service';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { ToastEnum } from 'src/app/shared/constants/toast.constant';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit, OnDestroy {

  form: UntypedFormGroup;
  steps: MenuItem[];
  stepIndex = 0;

  email: string;

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private passwordService: PasswordService,
    private router: Router,
    private menu: MenuController,
    private themeService: ThemeService,
    private toastService: MessageService,
  ) {
    this.form = this.formBuilder.group({
      codigo: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      senha: [, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    document.body.setAttribute('color-theme', 'light');
    this.themeService.switchTheme('saga-blue');

    this.steps = [
      {
        label: 'Recuperação',
      },
      {
        label: 'Reset',
      },
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.stepIndex = 0;
  }

  ionViewWillEnter() {
    this.stepIndex = 0;
    document.body.setAttribute('color-theme', 'light');
    this.themeService.switchTheme('saga-blue');
    this.menu.enable(false);
  }

  goBack() {
    this.stepIndex = 0;
    this.router.navigateByUrl('login');
  }

  setFocus(nextElement) {
    nextElement.setFocus();
  }

  sendRequest() {
    const email = this.form.get('email').value;

    const sub = this.passwordService.requestReset(email)
      .subscribe(response => {
        this.stepIndex++;
      });

    this.subscriptions.add(sub);
  }

  doReset() {

    const codigo = this.form.get('codigo').value;
    const senha = this.form.get('senha').value;

    const sub = this.passwordService.doReset(codigo, senha)
      .subscribe(response => {
        this.presentToast('success', 'Sucesso!', 'Senha alterada', ToastEnum.mediumDuration);
        this.goBack();
      });

    this.subscriptions.add(sub);
  }

  isInputError(inputName: string): boolean {
    const resp =
      this.form.controls[inputName].dirty &&
      this.form.controls[inputName].errors;

    if (resp) {
      return true;
    }
    return false;
  }

  disableBTN(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

  private presentToast(
    severity: string,
    summary: string,
    detail: string,
    life: ToastEnum
  ) {
    this.toastService.clear();
    this.toastService.add({
      severity,
      summary,
      detail,
      life,
    });
  }

}
