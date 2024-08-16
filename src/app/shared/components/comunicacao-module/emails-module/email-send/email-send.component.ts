
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { ModalController } from '@ionic/angular';


import { Subscription } from 'rxjs';

import { EmailService } from './../../../../../shared/services/comunicacao/emails/email.service';
import { ToastMessageService } from '../../../../../shared/services/toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../../shared/constants/toast.constant';
import { StringsUtils } from './../../../../../shared/utils/strings';
import { SendEmailHtmlDto } from './../../../../interfaces/comunicacoes/emails/send-email-html.dto';

@Component({
  selector: 'app-email-send',
  templateUrl: './email-send.component.html',
  styleUrls: ['./email-send.component.scss'],
})
export class EmailSendComponent implements OnInit, OnDestroy {

  @Input()
  email_list: string[]

  form: UntypedFormGroup;

  private subscriptions = new Subscription();

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly emailService: EmailService,
    private readonly toastService: ToastMessageService,
  ) {
  }

  ngOnInit() { 
    const email_list = this.emailService.getEmailList();
    this.form = this.formBuilder.group({
      subject: [, [Validators.required]],
      html: [, [Validators.required,]],
      email_list: [email_list, [Validators.required,]],
    });
  }

  ngOnDestroy(): void {
    this.emailService.clearEmailList();
    this.subscriptions.unsubscribe();
  }

  isInputError(inputName: string): boolean {
    const resp =
      !this.form.controls[inputName].untouched &&
      this.form.controls[inputName].errors;

    if (resp) {
      return true;
    }
    return false;
  }

  disableCreateBtn(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

  sendEmail() {
    const subject = this.form.get('subject').value;
    const html = this.form.get('html').value;
    const email_list = this.form.get('email_list').value;

    const email: SendEmailHtmlDto = {
      subject,
      html,
      email_list,
    }

    const add = this.emailService.sendHtmlEmail(email)
      .subscribe(response => {
        this.toastService.presentToast({
          detalhe: `E-mail inserido na fila para processamento!`,
          duracao: ToastEnum.mediumDuration,
          gravidade: ToastPrimeSeverityEnum.INFORMACAO,
          titulo: `Em fila...`
        });

        this.form.reset();
      });

    this.subscriptions.add(add);
  }

  addTo({ value: email }) {
    const isValidEmail = StringsUtils.checkIfEmail(email);

    if (!isValidEmail) {
      this.toastService.presentToast({
        detalhe: `'${email}' não é um e-mail válido!`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
        titulo: `E-mail inválido!`
      });
      const email_list = this.form.get('email_list').value as string[];
      const index = email_list.indexOf(email);
      email_list.splice(index, 1);
      this.form.get('email_list').setValue(email_list);
      this.form.updateValueAndValidity();
    }

  }

  show() {
    // this.showModal();
  }

  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modalCtrl.create({
      component,
      backdropDismiss: false,
      cssClass: 'modal-size-80',
      componentProps,
    });

    return await modal.present();
  }

}
