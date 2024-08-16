import { BrazilianMasksUtils } from './../../../../utils/BrazilianMasksUtils';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';

import { PageOrder } from './../../../../constants/page.constant';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { UserService } from './../../../../services/user/user.service';
import { TipoUsuarioEnum } from './../../../../constants/tipo-user.constant';
import { ChamadoStatusEnum, ChamadoStatusList, ChamadoTipoEnum, ChamadoTipoList } from './../../../../constants/chamado.constant';
import { ChamadoService } from './../../../../services/chamado/chamado.service';
import { ChamadoDto } from './../../../../interfaces/chamados/chamado.dto';

@Component({
  selector: 'app-chamado-status',
  templateUrl: './chamado-status.component.html',
  styleUrls: ['./chamado-status.component.scss'],
})
export class ChamadoStatusComponent implements OnInit, OnDestroy {

  @Input()
  chamado: ChamadoDto;

  form: UntypedFormGroup;

  chamados: PageableDto<ChamadoDto>;

  users: PageableDto<UserDto>;
  searchedUser = '';

  selectedchamado: string;
  currentchamadosPage = 1;
  searchedchamado = '';
  isLoaded = false;

  wasCreated = false;

  ChamadoStatusEnum = ChamadoStatusEnum;
  filtros = {
    status: ChamadoStatusList,
    tipo: ChamadoTipoList,
  }
  enableAnotacao = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly chamadoService: ChamadoService,
    private readonly userService: UserService,
    private readonly modalCadastro: ModalController,
    private readonly toastService: ToastMessageService,
  ) { }

  ngOnInit() {
    const {
      status, solicitante, tempo_decorrido
    } = this.chamado;

    const solicitanteDisplay = solicitante ? `${solicitante.nome} - ${BrazilianMasksUtils.maskCPF(solicitante.cpf)}` : 'Não definido';

    this.form = this.formBuilder.group({
      status: [status, [Validators.required]],
      anotacoes_fechamento: [[], []],

      tempo_decorrido: [tempo_decorrido, []],
      solicitante: [solicitanteDisplay, []],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  changeStatus({ value }) {
    if (value == ChamadoStatusEnum.CONCLUIDO || value == ChamadoStatusEnum.CANCELADO) {
      this.enableAnotacao = true;
      this.form.get('anotacoes_fechamento').addValidators([Validators.required]);
    } else {
      this.enableAnotacao = false;
      this.form.get('anotacoes_fechamento').clearValidators();
    }

    this.form.get('anotacoes_fechamento').updateValueAndValidity({ onlySelf: true });
    this.form.get('anotacoes_fechamento').updateValueAndValidity();
  }

  addToList(htmlElement: HTMLInputElement, listName: string) {
    const { value } = htmlElement;

    if (value.trim() == '') {
      return;
    }

    if (value.length <= 5) {
      this.toastService.presentToast({
        detalhe: `Pelo menos 5 caracteres`,
        titulo: `Muito curto`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }

    if (value.length > 200) {
      this.toastService.presentToast({
        detalhe: `No máximo 200 caracteres`,
        titulo: `Muito longo`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }

    const list = this.form.get(listName).value as string[];
    list.push(value.trim());
    this.form.get(listName).setValue(list);
    htmlElement.value = '';
  }

  removeFromList(value: string, listName: string) {
    const list = this.form.get(listName).value as string[];
    const indexToRemove = list.findIndex(i => i == value);
    list.splice(indexToRemove, 1);
    this.form.get(listName).setValue(list);
  }

  isEmptyList(listName: string) {
    const list = this.form.get(listName).value as string[];

    if (!list || list.length <= 0) {
      return true;
    }

    return false;
  }


  update() {
    const status = this.form.get('status').value;
    const anotacoes_fechamento = this.form.get('anotacoes_fechamento').value;

    console.log({
      status,
      anotacoes_fechamento,
    });

    const sub = this.chamadoService.updateStatus(this.chamado.id, {
      status,
      anotacoes_fechamento,
    })
      .subscribe(response => {
        this.wasCreated = true;
        this.fechar();
      });
    this.subscriptions.add(sub);
  }


  fechar() {
    this.modalCadastro.dismiss(this.wasCreated);
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
