
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Subscription } from 'rxjs';
import { ToastEnum } from './../../../../../shared/constants/toast.constant';
import { DespesaDto } from './../../../../../shared/interfaces/despesas/despesa.dto';
import { DespesaService } from './../../../../../shared/services/despesa/despesa.service';
import { DespesaCadastroComponent } from '../despesa-cadastro/despesa-cadastro.component';
import { DespesaDetailComponent } from '../despesa-detail/despesa-detail.component';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { PageOrder } from './../../../../constants/page.constant';

@Component({
  selector: 'app-despesa-main',
  templateUrl: './despesa-main.component.html',
  styleUrls: ['./despesa-main.component.scss'],
})
export class DespesaMainComponent implements OnInit, OnDestroy {

  despesas: PageableDto<DespesaDto>;
  currentPage = 1;

  isLoaded = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly despesaService: DespesaService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
  ) { }

  ngOnInit() {
    this.loadDespesas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadDespesas(page: number = 1) {
    const sub = this.despesaService.list({ order: PageOrder.ASC, page, take: 5 })
      .subscribe(data => {
        this.despesas = data;
        this.isLoaded = true;
      });

    this.subscriptions.add(sub);
  }

  search() {
    this.loadDespesas(1);
  }

  paginar(event) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentPage) {
      this.currentPage = page;
      this.loadDespesas(page);
    }
  }

  changeFiltro(event) {
    const { value } = event;
    this.loadDespesas();
  }

  createNew() {
    this.showModal(DespesaCadastroComponent);
  }

  editarDespesa(despesa: DespesaDto) {
    this.showModal(DespesaDetailComponent, { despesa });
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
          this.loadDespesas(this.currentPage);
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
