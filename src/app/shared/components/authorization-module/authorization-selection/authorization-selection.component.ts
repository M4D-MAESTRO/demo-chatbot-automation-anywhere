import { ToastEnum, ToastPrimeSeverityEnum } from './../../../constants/toast.constant';
import { PageOrder } from './../../../constants/page.constant';
import { Component, EventEmitter, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { FuncionalidadeDto } from './../../../interfaces/authorizations/funcionalidade.dto';
import { FuncionalidadesService } from './../../../services/authorizations/funcionalidades/funcionalidades.service';
import { ToastMessageService } from './../../../services/toast/toast-message.service';
import { AutorizacaoExplicitasService } from './../../../services/authorizations/autorizacao-explicitas/autorizacao-explicitas.service';
import { AutorizacaoExplicitaDto } from './../../../interfaces/authorizations/autorizacao-explicita.dto';

@Component({
  selector: 'app-authorization-selection',
  templateUrl: './authorization-selection.component.html',
  styleUrls: ['./authorization-selection.component.scss'],
})
export class AuthorizationSelectionComponent implements OnInit, OnDestroy {

  @Input()
  user_id: string;

  @Input()
  currentAutorizacoes: AutorizacaoExplicitaDto[]

  funcionalidades: FuncionalidadeDto[] = [];
  selectedFuncionalidades: FuncionalidadeDto[] = [];

  showQuestionDialog = false;
  questionTitle = '';
  questionDescription = '';

  form: UntypedFormGroup;

  private subscriptions = new Subscription();

  constructor(
    private readonly autorizacaoExplicitasService: AutorizacaoExplicitasService,
    private readonly funcionalidadesService: FuncionalidadesService,
    private readonly modalAuthorizationSelection: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      justificativa: [, [Validators.required, Validators.minLength(20)]],
    });

    this.selectedFuncionalidades = this.currentAutorizacoes.map(a => a.funcionalidade);
    this.funcionalidadesService.list({}, { page: 1, take: 50, order: PageOrder.ASC })
      .subscribe({
        next: (data) => {
          this.funcionalidades = data.data;
        }
      });

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  detailFuncionalidade(funcionalidade: FuncionalidadeDto) {
    this.questionTitle = funcionalidade.nome;
    this.questionDescription = funcionalidade.descricao;
    this.showQuestionDialog = true;
  }

  salvar() {
    const justificativa = this.form.get('justificativa').value as string;

    if (!justificativa || justificativa.length < 20) {
      this.toastService.presentToast({
        detalhe: `Insira uma justificativa válida`,
        titulo: `Atenção!`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO
      });
    }

    const funcionalidades_id = this.selectedFuncionalidades.map(f => f.id);
    const dto = {
      justificativa,
      funcionalidades_id,
    };

    this.autorizacaoExplicitasService.createForUser(this.user_id, dto)
      .subscribe(
        {
          next: () => {
            this.fechar(true);
          }
        }
      );
  }

  fechar(wasCreated = false) {
    this.modalAuthorizationSelection.dismiss(wasCreated, null, 'selection');
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
    const situacao = !this.form.valid;

    return situacao;
  }

}
