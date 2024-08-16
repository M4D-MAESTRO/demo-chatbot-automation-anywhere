import { PageOrder } from './../../../../constants/page.constant';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../../shared/constants/toast.constant';
import { LojaDto } from '../../../../../shared/interfaces/lojas/loja.dto';
import { LojaService } from '../../../../../shared/services/loja/loja.service';
import { EnderecoComponent } from '../../../endereco-module/endereco/endereco.component';
import { UpdateEnderecoComponent } from '../../../endereco-module/update-endereco/update-endereco.component';
import { LojaCadastroComponent } from '../loja-cadastro/loja-cadastro.component';
import { LojaDetailComponent } from '../loja-detail/loja-detail.component';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';

@Component({
  selector: 'app-loja-main',
  templateUrl: './loja-main.component.html',
  styleUrls: ['./loja-main.component.scss'],
})
export class LojaMainComponent implements OnInit, OnDestroy {

  lojas: PageableDto<LojaDto>;
  sortOptions: SelectItem[] = [];

  currentPage = 1;
  isLoaded = false;

  contentError = {
    code: undefined,
    hasError: false,
  };

  private subscriptions = new Subscription();

  constructor(
    private readonly lojaService: LojaService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
  ) { }

  ngOnInit() {
    this.loadLojas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadLojas(page: number = 1) {
    const sub = this.lojaService.list({}, { order: PageOrder.ASC, page, take: 5 })
      .subscribe({
        next: data => {
          this.lojas = data;
          this.isLoaded = true;
          this.contentError = {
            code: undefined,
            hasError: false,
          };
        },
        error: error => {
          this.contentError = {
            code: error.status,
            hasError: true,
          };
        },
      });

    this.subscriptions.add(sub);
  }

  lojaLabel(loja: LojaDto) {
    return `${loja.nome} - ${loja.codigo}`;
  }

  search() {
    this.loadLojas(1);
  }

  paginar(event) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentPage) {
      this.currentPage = page;
      this.loadLojas(page);
    }
  }

  createNew() {
    // TODO Nova Loja
    this.showModal(LojaCadastroComponent);
  }

  editarloja(loja: LojaDto) {
    this.showModal(LojaDetailComponent, { loja });
  }


  editarEndereco(loja: LojaDto) {
    if (loja.endereco) {
      this.showModal(UpdateEnderecoComponent, { currentEndereco: loja, isFuncionario: false });
    } else {
      this.showModal(EnderecoComponent, { idOf: loja.id, isFuncionario: false, isModal: true });
    }
  }

  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modal.create({
      component,
      backdropDismiss: false,
      cssClass: 'modal-size-80',
      componentProps,
    });

    modal.onDidDismiss()
      .then((data) => {
        const { data: hasUpdate } = data;
        if (hasUpdate) {
          this.loadLojas();
          this.toastService.presentToast({
            detalhe: `Operação bem sucedida!`,
            titulo: `Sucesso!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO
          });
        }
      });

    return await modal.present();
  }

}
