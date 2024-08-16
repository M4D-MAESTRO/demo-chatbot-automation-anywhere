import { EMPRESA_INFO } from './../../../../../config/empresa.config';
import { CreateUserDto } from './../../../interfaces/users/user.dto';
import { ApiService } from './../../../services/api/api.service';
import { ApiDto } from './../../../interfaces/api/api.dto';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Subscription } from 'rxjs';

import { ToastEnum } from './../../../../shared/constants/toast.constant';

import { SYSTEM_INFO } from './../../../../../config/app.config';
import { ExternalRedirect } from './../../../../shared/utils/ExternalLink';

@Component({
  selector: 'app-versao-main',
  templateUrl: './versao-main.component.html',
  styleUrls: ['./versao-main.component.scss'],
})
export class VersaoMainComponent implements OnInit, OnDestroy {

  apiInfo: ApiDto = undefined;

  private subscriptions = new Subscription();

  constructor(
    private readonly apiService: ApiService,
  ) { }

  ngOnInit() {
    this.loadApiInfo();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadApiInfo() {
    const sub = this.apiService.getApiVersion()
      .subscribe(data => {
        this.apiInfo = data;
      });

    this.subscriptions.add(sub);

  }

  goToPolicyLink() {
    ExternalRedirect.externalLinkHandle('https://www.google.com/');
  }
  goToTermsLink() {
    ExternalRedirect.externalLinkHandle('https://www.google.com/');
  }
  goToSendEmail(){
   // ExternalRedirect.externalLinkHandle(`mailto:${this.getEmpresaInfo().EMPRESA_EMAIL}`);
  }
  openLink(url: string) {
    ExternalRedirect.externalLinkHandle(url);
  }

  getSystemInfo() {
    return SYSTEM_INFO;
  }

  getEmpresaInfo() {
    return EMPRESA_INFO;
  }

}
