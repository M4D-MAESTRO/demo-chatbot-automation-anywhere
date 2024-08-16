
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';
import { saveAs } from 'file-saver';

import { PagamentoDto, PatchComprovanteToPagamentoDto } from './../../../../../shared/interfaces/adm-financeiras/pagamentos/pagamento.dto';
import { PagamentosService } from './../../../../services/adm-financeira/pagamentos/pagamentos.service';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';

@Component({
  selector: 'app-pagamento-detail',
  templateUrl: './pagamento-detail.component.html',
  styleUrls: ['./pagamento-detail.component.scss'],
})
export class PagamentoDetailComponent implements OnInit, OnDestroy {

  @Input()
  pagamento: PagamentoDto;
  title: string = 'Pagamento';

  hasUpdate = false;
  private subscriptions = new Subscription();

  constructor(
    private readonly modal: ModalController,
    private readonly toastMessageService: ToastMessageService,
    private readonly pagamentosService: PagamentosService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  downContaOriginal() {
    const { conta_original_url, conta_original } = this.pagamento;
    saveAs(conta_original_url, conta_original);

    this.toastMessageService.presentToast({
      detalhe: 'Baixando a conta',
      duracao: ToastEnum.shortDuration,
      gravidade: ToastPrimeSeverityEnum.SUCESSO,
      titulo: 'Download em andamento'
    });
  }

  downComprovante() {
    const { comprovante_url, comprovante } = this.pagamento;
    saveAs(comprovante_url, comprovante);

    this.toastMessageService.presentToast({
      detalhe: 'Baixando o comprovante',
      duracao: ToastEnum.shortDuration,
      gravidade: ToastPrimeSeverityEnum.SUCESSO,
      titulo: 'Download em andamento'
    });
  }

  seeSolicitacao() {

  }

  anexarComprovante(event, fileUpload: FileUpload) {
    const file = event.files[0];
    fileUpload.clear();
    const sub = this.pagamentosService.createComprovante(file)
      .subscribe({
        next: (data) => {
          const { id: comprovante_id } = data;
          this.associarComprovante(this.pagamento.id, { comprovante_id });
        },
      });
      this.subscriptions.add(sub);
  }

  associarComprovante(id: string, { comprovante_id }: PatchComprovanteToPagamentoDto) {
    const sub = this.pagamentosService.associarComprovante(id, { comprovante_id })
      .subscribe({
        next: (data) => {
          this.toastMessageService.presentToast({
            detalhe: `Arquivo anexado!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO,
            titulo: `Sucesso!`
          });
          this.pagamento = data;
          this.hasUpdate = true;
        }
      });
      this.subscriptions.add(sub);
  }

  concluir() {
    const sub = this.pagamentosService.concluirPagamento(this.pagamento.id)
      .subscribe({
        next: (data) => {
          this.toastMessageService.presentToast({
            detalhe: `Pagamento concluído!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO,
            titulo: `Sucesso!`
          });
          this.hasUpdate = true;
          this.fechar();
        }
      });

    this.subscriptions.add(sub);
  }


  async fechar() {
    await this.modal.dismiss(this.hasUpdate);
  }
}
