
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';

import { PageOrder } from './../../../../constants/page.constant';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { DespesaDto } from './../../../../interfaces/despesas/despesa.dto';
import { TipoOperacaoSaidaDto } from './../../../../interfaces/fluxo-pagamentos/tipos-operacao-saida/tipo-operacao-saida.dto';
import { TipoOperacaoSaidaService } from './../../../../../shared/services/fluxo-pagamentos/tipos-operacao-saida/tipo-operacao-saida.service';
import { PagamentosService } from './../../../../services/adm-financeira/pagamentos/pagamentos.service';
import { DespesaService } from './../../../../services/despesa/despesa.service';
import { TipoTransacaoEnum } from './../../../../constants/transacao.constant';


@Component({
  selector: 'app-pagamento-create',
  templateUrl: './pagamento-create.component.html',
  styleUrls: ['./pagamento-create.component.scss'],
})
export class PagamentoCreateComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;

  operacoes: PageableDto<TipoOperacaoSaidaDto>;
  searchedOperacao = '';
  selectedOperacao: TipoOperacaoSaidaDto;
  showOperacaoDialog = false;

  despesas: PageableDto<DespesaDto>;
  searchedDespesa = '';
  selectedDespesa: DespesaDto;
  showDespesaDialog = false;
  enableDespesas = false;

  private hasUpdate = false;
  private conta_original_id: string;
  private comprovante_id: string;
  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly tipoOperacaoSaidaService: TipoOperacaoSaidaService,
    private readonly despesasService: DespesaService,
    private readonly pagamentosService: PagamentosService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      custo: [, [Validators.required]],
      operacao: [, [Validators.required]],
      data_vencimento: [, [Validators.required]],
      conta_original_id: [, []],
      despesa: [, []],
    });

    this.loadOperacao();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  //#region OPERACOES
  loadOperacao(page = 1, dropdown?: Dropdown) {
    const sub = this.tipoOperacaoSaidaService.list(
      { searchedTipoOperacao: this.searchedOperacao },
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.operacoes = data;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  paginarOperacao(event) {
    this.loadOperacao();
  }
  onOperacaoFilter(event) {
    const filter = event.filter as string;
    this.searchedOperacao = filter;
  }
  blurOperacao(event, dropdown: Dropdown) {
    this.searchedOperacao = undefined;
    dropdown.filterValue = undefined;
  }
  detailOperacao() {
    this.selectedOperacao = this.form.get('operacao').value;
    if (!this.selectedOperacao) {
      this.toastService.presentToast({
        detalhe: `Selecione uma operação primeiro`,
        titulo: `Seleção necessária`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.INFORMACAO,
      });
      return;
    }
    this.toastService.presentInfoOverlay({
      data: this.selectedOperacao.descricao,
      header: 'Operação',
      showHeader: true,

    });
  }
  changeOperacao({ value }) {
    const { tipo_transacao } = value as TipoOperacaoSaidaDto;
    this.selectedDespesa = undefined;
    this.form.get('despesa').setValue(undefined);
    this.form.get('despesa').clearValidators();

    if (tipo_transacao == TipoTransacaoEnum.DESPESA) {
      this.form.get('despesa').setValidators([Validators.required]);
      this.loadDespesa();
    } else {
      this.enableDespesas = false;
      this.despesas = undefined;
    }

    this.form.get('despesa').updateValueAndValidity({ onlySelf: true });
    this.form.updateValueAndValidity();
  }
  //#endregion

  //#region DESPESAS
  loadDespesa(page = 1, dropdown?: Dropdown) {
    const sub = this.despesasService.list(
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.despesas = data;
        this.enableDespesas = true;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  paginarDespesa(event) {
    this.loadDespesa();
  }
  onDespesaFilter(event) {
    const filter = event.filter as string;
    this.searchedDespesa = filter;
  }
  blurDespesa(event, dropdown: Dropdown) {
    this.searchedDespesa = undefined;
    dropdown.filterValue = undefined;
  }
  detailDespesa() {
    this.selectedDespesa = this.form.get('despesa').value;
    if (!this.selectedDespesa) {
      this.toastService.presentToast({
        detalhe: `Selecione uma despesa primeiro`,
        titulo: `Seleção necessária`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.INFORMACAO,
      });
      return;
    }

    this.toastService.presentInfoOverlay({
      data: this.selectedDespesa.descricao,
      header: 'Despesa',
      showHeader: true,
    });
  }
  //#endregion


  //#region ANEXOS

  anexarContaOriginal(event, fileUpload: FileUpload) {
    //  this.conta_original_id = undefined;
    const file = event.files[0];
    fileUpload.clear();
    this.pagamentosService.createContaOriginal(file)
      .subscribe({
        next: (data) => {
          const { id: conta_original_id } = data;
          this.conta_original_id = conta_original_id;

          this.toastService.presentToast({
            detalhe: `Conta original anexada!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO,
            titulo: `Sucesso!`
          });
        },
      })
  }

  anexarComprovante(event, fileUpload: FileUpload) {
    // this.comprovante_id = undefined;
    const file = event.files[0];
    fileUpload.clear();
    this.pagamentosService.createComprovante(file)
      .subscribe({
        next: (data) => {
          const { id: comprovante_id } = data;
          this.comprovante_id = comprovante_id;

          this.toastService.presentToast({
            detalhe: `Comprovante anexado!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO,
            titulo: `Sucesso!`
          });
        },
      })
  }

  get comprovanteId() {
    return this.comprovante_id;
  }

  get contaOriginalId() {
    return this.conta_original_id;
  }
  //#endregion

  create() {
    const custo = this.form.get('custo').value == null ? undefined : Number(this.form.get('custo').value);
    const data_vencimento = this.form.get('data_vencimento').value == null ? undefined : this.form.get('data_vencimento').value;

    const operacao_id = this.form.get('operacao').value == null ? undefined : this.form.get('operacao').value.id;
    const despesa_id = this.form.get('despesa').value == null ? undefined : this.form.get('despesa').value.id;


    const sub = this.pagamentosService.create({
      custo,
      data_vencimento,
      operacao_id,
      despesa_id,
      conta_original_id: this.conta_original_id,
      comprovante_id: this.comprovante_id
    })
      .subscribe(data => {
        this.hasUpdate = true;
        this.fechar();
      });

    this.subscriptions.add(sub);
  }

  fechar() {
    this.modal.dismiss(this.hasUpdate, 'create');
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
    if (!this.form.valid || !this.conta_original_id) {
      return true;
    }

    return false;
  }

}
