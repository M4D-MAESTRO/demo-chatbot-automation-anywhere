import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';

import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';

import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../../shared/constants/toast.constant';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { PageOrder } from './../../../../constants/page.constant';
import { FilesService } from './../../../../services/utils/files/files.service';

import { EncomendaDetailComponent } from '../encomenda-detail/encomenda-detail.component';
import { EncomendaCadastroComponent } from '../encomenda-cadastro/encomenda-cadastro.component';
import { EncomendaStatus, EncomendaStatusList } from './../../../../constants/encomenda.constant';
import { EncomendasService } from './../../../../services/encomendas/encomendas.service';
import { EncomendaDto } from './../../../../interfaces/encomendas/encomenda.dto';
import { EncomendaFinalizarComponent } from '../encomenda-finalizar/encomenda-finalizar.component';

@Component({
  selector: 'app-encomenda-main',
  templateUrl: './encomenda-main.component.html',
  styleUrls: ['./encomenda-main.component.scss'],
})
export class EncomendaMainComponent implements OnInit, OnDestroy {

  encomendas: PageableDto<EncomendaDto>;
  isLoaded = false;
  currentCondominioLoaded: string;
  searchedEncomenda = '';
  selectedCondominio = '';
  selectedStatus = '';
  currentPage = 1;
  selectedEncomenda: EncomendaDto;

  EncomendaStatus = EncomendaStatus;


  sortOptions: SelectItem[] = [];

  editMenuItens: MenuItem[] = [{
    label: 'Opções',
    items: [
      {
        label: 'Detalhar',
        icon: 'pi pi-pencil',
        command: () => this.detalharAtualizar(this.selectedEncomenda),
      },
      {
        label: 'Finalizar',
        icon: 'pi pi-check',
        command: () => this.detalharFinalizar(this.selectedEncomenda),
      },
      {
        label: 'Baixar comprovante',
        icon: 'pi pi-download',
        command: () => this.baixarComprovante(this.selectedEncomenda),
      }
    ]
  }
  ];

  private subscriptions = new Subscription();

  constructor(
    private readonly encomendaService: EncomendasService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly filesService: FilesService,
  ) { }

  ngOnInit() {
    //Permitir filtrar usuário por status
    this.sortOptions = [...EncomendaStatusList];

    // this.loadCondominio();
    this.loadEncomendas();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeFiltro({ value }) {
    this.selectedStatus = value;
    this.loadEncomendas(1);
  }

  //#region Condominios

  changeCondominio({ value }) {
    this.selectedCondominio = value;
    this.loadEncomendas(1);
  }

  clearFilter() {
    this.loadEncomendas(1);
  }

  clearAllFilters(event, dropdown_filtro: Dropdown) {
    this.searchedEncomenda = undefined;
    this.selectedCondominio = undefined;
    this.selectedStatus = undefined;

    dropdown_filtro.writeValue(null);

    this.loadEncomendas(1);
  }

  loadEncomendas(page = 1) {
    const sub = this.encomendaService.list({
      searched_encomenda: this.searchedEncomenda,
      status: this.selectedStatus,
    },
      { order: PageOrder.DESC, page, take: 10 })
      .subscribe(response => {
        this.encomendas = response;
        this.isLoaded = true;
      });
    this.subscriptions.add(sub);
  }

  //#endregion

  detalharFinalizar(encomenda: EncomendaDto) {
    const { status } = encomenda;
    if (status == EncomendaStatus.DELETADO) {
      this.toastService.presentToast({
        titulo: 'Atenção',
        detalhe: 'Não é possível finalizar uma encomenda deletada',
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }

    if (status != EncomendaStatus.AGUARDANDO) {
      this.toastService.presentToast({
        titulo: 'Atenção',
        detalhe: 'Não é possível finalizar uma encomenda já finalizada',
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }
    this.showModal(EncomendaFinalizarComponent, { encomenda });
  }

  detalharAtualizar(encomenda: EncomendaDto) {
    this.showModal(EncomendaDetailComponent, { encomenda });
  }

  async baixarComprovante(encomenda: EncomendaDto) {
    const { comprovante_url, comprovante } = encomenda;

    if (!comprovante_url) {
      this.toastService.presentToast({
        titulo: 'Não disponível',
        detalhe: 'Sem comprovantes disponíveis para download',
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }
    await this.filesService.saveUrlFile(comprovante_url, comprovante.nome);
  }

  createNew() {
    this.showModal(EncomendaCadastroComponent);
  }

  search() {
    this.loadEncomendas(1);
  }

  paginar(event) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentPage) {
      this.currentPage = page;
      this.loadEncomendas(page);
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
      const { data: hasUpdate } = data;
      this.isLoaded = false;
      this.loadEncomendas();
      if (hasUpdate) {
        this.toastService.presentToast({
          titulo: 'Sucesso',
          detalhe: 'Operação bem sucedida!',
          duracao: ToastEnum.mediumDuration,
          gravidade: ToastPrimeSeverityEnum.SUCESSO,
        });
      }
    });

    return await modal.present();
  }

}
