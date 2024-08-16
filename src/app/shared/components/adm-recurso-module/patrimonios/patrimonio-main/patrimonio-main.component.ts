import { Component, OnDestroy, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';

import { ConfirmationService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';

import { PatrimonioDto } from '../../../../../shared/interfaces/patrimonios/patrimonio.dto';
import { PatrimonioService } from '../../../../../shared/services/patrimonio/patrimonio.service';
import { PatrimonioCadastroComponent } from '../patrimonio-cadastro/patrimonio-cadastro.component';
import { PatrimonioDetailComponent } from '../patrimonio-detail/patrimonio-detail.component';
import { ToastMessageService } from '../../../../../shared/services/toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../../shared/constants/toast.constant';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { PageOrder } from './../../../../constants/page.constant';
import { LojaService } from './../../../../services/loja/loja.service';

@Component({
  selector: 'app-patrimonio-main',
  templateUrl: './patrimonio-main.component.html',
  styleUrls: ['./patrimonio-main.component.scss'],
})
export class PatrimonioMainComponent implements OnInit, OnDestroy {

  patrimonios: PageableDto<PatrimonioDto>;

  sortOptions: SelectItem[] = [];
  sortlojas: SelectItem[] = [];

  currentlojaLoaded: string;
  searchedPatrimonio = '';
  selectedLoja = undefined;
  selectedStatus = '';
  currentPage = 1;

  private idFisicoDispositivo: string;
  private subscriptions = new Subscription();

  constructor(
    private readonly patrimonioService: PatrimonioService,
    private readonly modal: ModalController,
    private readonly confirmationService: ConfirmationService,
    private readonly toastService: ToastMessageService,
    private readonly lojaService: LojaService,
  ) { }

  async ngOnInit() {
    this.idFisicoDispositivo = await this.getCurrentIdFisico();
    //  this.loadloja();
    this.loadPatrimonios();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeloja({ value }) {
    this.selectedLoja = value;
    this.loadPatrimonios(1);
  }


  clearAllFilters(event, dropdown_lojas: Dropdown) {
    this.searchedPatrimonio = undefined;
    this.selectedLoja = undefined;
    this.selectedStatus = undefined;

    dropdown_lojas.writeValue(null);

    this.loadPatrimonios(1);
  }

  loadloja() {
    const sub = this.lojaService.list()
      .subscribe(page => {
        this.sortlojas = page.data.map((l) => {
          const { id, nome, codigo } = l;
          return {
            value: id,
            label: `[${codigo}] - ${nome}`
          }
        });
      });
    this.subscriptions.add(sub);
  }

  loadPatrimonios(page = 1) {
    const sub = this.patrimonioService.list({
      searchedPatrimonio: this.searchedPatrimonio,
      loja_id: this.selectedLoja,
      status_patrimonio: this.selectedStatus
    },
      { order: PageOrder.DESC, page, take: 5 })
      .subscribe(response => {
        this.patrimonios = response;
      });
    this.subscriptions.add(sub);
  }


  search() {
    this.loadPatrimonios(1);
  }

  paginar(event) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentPage) {
      this.currentPage = page;
      this.loadPatrimonios(page);
    }
  }

  createNew() {
    this.showModal(PatrimonioCadastroComponent);
  }

  detalhar(patrimonio: PatrimonioDto) {
    this.showModal(PatrimonioDetailComponent, { patrimonio });
  }

  associar(patrimonio: PatrimonioDto) {
    this.confirmationService.confirm({
      message: 'Deseja associar o dispositivo em que está logado a este patrimônio?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patrimonioService.associate(patrimonio.id, this.idFisicoDispositivo)
          .subscribe(data => {
            this.loadPatrimonios(1);
            this.toastService.presentToast({
              detalhe: `Associado com sucesso!`,
              duracao: ToastEnum.mediumDuration,
              gravidade: ToastPrimeSeverityEnum.SUCESSO,
              titulo: `Sucesso!`
            });
          });
      },
      reject: (type) => {
        this.toastService.clearToast();
      }
    });
  }

  desassociar(patrimonio: PatrimonioDto) {
    this.confirmationService.confirm({
      message: 'Deseja desassociar o dispositivo este patrimônio?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patrimonioService.desassociar(patrimonio.id)
          .subscribe(data => {
            this.loadPatrimonios(1);
            this.toastService.presentToast({
              detalhe: `Desassociado com sucesso!`,
              duracao: ToastEnum.mediumDuration,
              gravidade: ToastPrimeSeverityEnum.SUCESSO,
              titulo: `Sucesso!`
            });
          });
      },
      reject: (type) => {
        this.toastService.clearToast();
      }
    });
  }

  async getCurrentIdFisico() {
    const { identifier } = await Device.getId();
    return identifier;
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
          this.toastService.presentToast({
            detalhe: `Operação bem sucedida!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO,
            titulo: `Sucesso!`
          });
        }

        if (data.role) {
          const { loterica_id } = data.role as any;
          this.loadPatrimonios(1);
          this.toastService.presentToast({
            detalhe: `Operação bem sucedida!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO,
            titulo: `Sucesso!`
          });
        }


      });

    return await modal.present();
  }

}
