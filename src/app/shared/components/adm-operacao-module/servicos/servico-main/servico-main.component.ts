import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ServicosDto } from './../../../../interfaces/servicos/servicoes.dto';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ServicosService } from './../../../../services/servico/servicos.service';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { PageOrder } from './../../../../constants/page.constant';
import { ServicoCadastroComponent } from '../servico-cadastro/servico-cadastro.component';
import { ServicoDetailComponent } from '../servico-detail/servico-detail.component';


@Component({
  selector: 'app-servico-main',
  templateUrl: './servico-main.component.html',
  styleUrls: ['./servico-main.component.scss'],
})
export class ServicoMainComponent implements OnInit, OnDestroy {


  servicos: PageableDto<ServicosDto>;
  sortOptions: SelectItem[] = [];
  searchedNome: string = '';
  currentPage = 1;

  isLoaded = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly servicoService: ServicosService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
  ) { }

  ngOnInit() {
    this.loadServicos();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadServicos(page: number = 1, nome = undefined) {
    const sub = this.servicoService.list({ nome }, { order: PageOrder.DESC, page, take: 5 })
      .subscribe(data => {
        this.servicos = data;
        this.isLoaded = true;
      });

    this.subscriptions.add(sub);
  }


  changeFiltro(event) {
    const { value } = event;
    this.loadServicos();
  }

  createNew() {
    this.showModal(ServicoCadastroComponent);
  }

  editar(servico: ServicosDto) {
    this.showModal(ServicoDetailComponent, { servico });
  }

  search() {
    this.loadServicos(1, this.searchedNome);
  }

  paginar(event) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentPage) {
      this.currentPage = page;
      this.loadServicos(page);
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
          this.loadServicos();
          this.toastService.presentToast({
            detalhe: `Operação bem sucedida!`,
            titulo: `Sucesso!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO
          })
        }
      });

    return await modal.present();
  }

}
