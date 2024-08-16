import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { NavigationExtras, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';

import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { PageOrder } from './../../../../constants/page.constant';
import { PagamentosService } from './../../../../../shared/services/adm-financeira/pagamentos/pagamentos.service';
import { PagamentoDetailComponent } from '../pagamento-detail/pagamento-detail.component';
import { PagamentoCreateComponent } from '../pagamento-create/pagamento-create.component';
import { PagamentoDto } from './../../../../interfaces/adm-financeiras/pagamentos/pagamento.dto';
import { PagamentoStatus, PagamentoStatusEnum } from './../../../../../shared/constants/pagamento-status.constant';

@Component({
  selector: 'app-pagamento-main',
  templateUrl: './pagamento-main.component.html',
  styleUrls: ['./pagamento-main.component.scss'],
})
export class PagamentoMainComponent implements OnInit, OnDestroy {

  pagamentos: PageableDto<PagamentoDto>;
  statusOptions: SelectItem[] = [];
  selectedStatus: any[] = []
  searchedPagamento: string = '';
  currentPage = 1;

  isLoaded = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly pagamentoService: PagamentosService,
    private readonly modal: ModalController,
    private readonly toastMessageService: ToastMessageService,
  ) { }

  ngOnInit() {
    this.statusOptions = [...PagamentoStatus];
    this.selectedStatus.push(PagamentoStatusEnum.PENDENTE, PagamentoStatusEnum.ATRASADO);
    this.loadPagamentos();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadPagamentos(page: number = 1) {
    const sub = this.pagamentoService.list({ status: this.selectedStatus }, { order: PageOrder.DESC, page, take: 5 })
      .subscribe(data => {
        this.pagamentos = data;
        this.isLoaded = true;
      });

    this.subscriptions.add(sub);
  }


  changeFiltro(event) {
    this.loadPagamentos();
  }

  createNew() {
    this.showModal(PagamentoCreateComponent);
  }

  detalhar(pagamento: PagamentoDto) {
    this.showModal(PagamentoDetailComponent, { pagamento }, ['modal-size-80', 'modal-transparent']);
  }

  search() {
    this.loadPagamentos(1);
  }

  paginar(event) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentPage) {
      this.currentPage = page;
      this.loadPagamentos(page);
    }
  }

  downContaOriginal({ conta_original_url, conta_original }: PagamentoDto) {
    saveAs(conta_original_url, conta_original);

    this.toastMessageService.presentToast({
      detalhe: 'Baixando a conta',
      duracao: ToastEnum.shortDuration,
      gravidade: ToastPrimeSeverityEnum.SUCESSO,
      titulo: 'Download em andamento'
    });
  }

  downComprovante({ comprovante_url, comprovante }: PagamentoDto) {
    saveAs(comprovante_url, comprovante);

    this.toastMessageService.presentToast({
      detalhe: 'Baixando o comprovante',
      duracao: ToastEnum.shortDuration,
      gravidade: ToastPrimeSeverityEnum.SUCESSO,
      titulo: 'Download em andamento'
    });
  }

  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps,
    cssClass = ['modal-size-80'],
  ) {
    const modal = await this.modal.create({
      component,
      backdropDismiss: false,
      cssClass,
      componentProps,
    });

    modal.onDidDismiss()
      .then((data) => {
        const { data: hasUpdate, role } = data;

        if (hasUpdate) {
          this.loadPagamentos(this.currentPage);
          if (role == 'create') {
            this.toastMessageService.presentToast({
              detalhe: `Pagamento criado com sucesso!`,
              titulo: `Sucesso!`,
              duracao: ToastEnum.mediumDuration,
              gravidade: ToastPrimeSeverityEnum.SUCESSO,
            });
          }
        }

      });

    return await modal.present();
  }

}
