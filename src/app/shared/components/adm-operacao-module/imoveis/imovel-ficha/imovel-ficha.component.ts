
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { CondominioService } from '../../../../services/condominio/condominio.service';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ImovelService } from './../../../../services/imovel/imovel.service';
import { ImovelDto } from './../../../../interfaces/imoveis/imovel.dto';
import { LoaderService } from './../../../../services/app-loader/loader.service';
import { FilesService } from './../../../../services/utils/files/files.service';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { ReportService } from './../../../../services/relatorio/report.service';

@Component({
  selector: 'app-imovel-ficha',
  templateUrl: './imovel-ficha.component.html',
  styleUrls: ['./imovel-ficha.component.scss'],
})
export class ImovelFichaComponent implements OnInit, OnDestroy {

  @Input()
  imovel_id: string;

  imovel: ImovelDto;

  editMenuItens: MenuItem[] = [{
    label: 'Baixar PDF',
    items: [
      {
        label: 'Simplificado',
        icon: 'pi pi-download',
        command: () => this.downloadPdfCompleto(),
      },
      {
        label: 'Completo',
        icon: 'pi pi-download',
        command: () => this.downloadPdfCompleto(),
      },
    ]
  }
  ];

  private subscriptions = new Subscription();

  constructor(
    private readonly imovelService: ImovelService,
    private readonly condominioService: CondominioService,
    private readonly modalCadastro: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly loaderService: LoaderService,
    private readonly reportService: ReportService,
    private readonly filesService: FilesService,
  ) { }

  ngOnInit() {

    const sub = this.imovelService.findFichaById(this.imovel_id)
      .subscribe({
        next: (response) => {
          this.imovel = response;
        }
      });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async downloadPdfCompleto() {
    try {
     await this.reportService.getImovelCompletoPdf(this.imovel);
    } catch (e) {
      this.toastService.presentToast({
        titulo: `Erro`,
        detalhe: `Falha ao baixar o PDF`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ERRO,
      });
      await this.loaderService.dismissLoader();
    }
  }


  async downloadPdfSimplificado() {
    try {
     await this.reportService.getImovelCompletoPdf(this.imovel);
    } catch (e) {
      this.toastService.presentToast({
        titulo: `Erro`,
        detalhe: `Falha ao baixar o PDF`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ERRO,
      });
      await this.loaderService.dismissLoader();
    }
  }

  fechar() {
    this.modalCadastro.dismiss();
  }


  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modalCadastro.create({
      component,
      backdropDismiss: false,
      cssClass: 'modal-size-100',
      componentProps,
    });

    modal.onDidDismiss().then((data) => {
    });

    return await modal.present();
  }

}
