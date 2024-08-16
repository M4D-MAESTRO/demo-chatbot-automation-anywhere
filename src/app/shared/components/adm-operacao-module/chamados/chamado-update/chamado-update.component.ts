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
import { ChamadoStatusList, ChamadoTipoEnum, ChamadoTipoList } from './../../../../constants/chamado.constant';
import { ChamadoService } from './../../../../services/chamado/chamado.service';
import { ChamadoDto } from './../../../../interfaces/chamados/chamado.dto';
import { ArquivoGeralDto } from './../../../../interfaces/arquivos/arquivo-geral.dto';
import { BrazilianMasksUtils } from './../../../../../shared/utils/BrazilianMasksUtils';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.scss'],
})
export class ChamadoUpdateComponent implements OnInit, OnDestroy {

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

  ChamadoTipoEnum = ChamadoTipoEnum;
  filtros = {
    status: ChamadoStatusList,
    tipo: ChamadoTipoList,
  }

  private foto: ArquivoGeralDto;
  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly chamadoService: ChamadoService,
    private readonly userService: UserService,
    private readonly modalCadastro: ModalController,
    private readonly toastService: ToastMessageService,
  ) {

  }

  ngOnInit() {
    const {
      tipo, tempo_decorrido, tempo_sla, descricoes_servico, produtos_utilizados,
      observacao_geral, observacoes_servico, nome_empresa, executor, foto, solicitante
    } = this.chamado;

    this.foto = foto;
    const solicitanteDisplay = solicitante ? `${solicitante.nome} - ${BrazilianMasksUtils.maskCPF(solicitante.cpf)}` : 'Não definido';

    this.form = this.formBuilder.group({
      tempo_sla: [tempo_sla, [Validators.min(1)]],
      tipo: [tipo, [Validators.required,]],
      descricoes_servico: [[...descricoes_servico], [Validators.required, Validators.maxLength(200)]],

      produtos_utilizados: [[...produtos_utilizados], [Validators.maxLength(200)]],
      observacoes_servico: [[...observacoes_servico], [Validators.maxLength(200)]],
      executor_id: [executor?.id || null, []],

      nome_empresa: [nome_empresa, [Validators.minLength(1),]],
      observacao_geral: [observacao_geral, [Validators.minLength(3),]],

      tempo_decorrido: [tempo_decorrido, []],
      solicitante: [solicitanteDisplay, []],
    });
    this.loadUsers(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  //#region USERS
  loadUsers(page = 1) {
    const sub = this.userService.listUsers(
      { searchedUser: this.searchedUser, tipo_usuario: TipoUsuarioEnum.FUNCIONARIO },
      { order: PageOrder.DESC, page, take: 10 }
    )
      .subscribe(response => {
        this.users = response;

      });
    this.subscriptions.add(sub);
  }

  paginarUser({ value }) {
    this.searchedUser = undefined;
    if (value) {
      this.searchedUser = value;
    }
    this.loadUsers(1);
  }

  //#endregion

  //#region Chamados

  loadChamados(page = 1, dropdown?: Dropdown) {
    const sub = this.chamadoService.list(
      { searched_chamado: this.searchedchamado, },
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.chamados = data;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  searchchamado(dropdown?: Dropdown) {
    this.loadChamados(1, dropdown);
  }
  paginarchamados(event, dropdown?: Dropdown) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentchamadosPage) {
      this.currentchamadosPage = page;
      this.loadChamados(page, dropdown);
    }
  }

  //#endregion

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


  anexarComprovante(event, fileUpload: FileUpload) {
    // this.comprovante_id = undefined;
    const file = event.files[0];
    fileUpload.clear();
    this.chamadoService.createAnexo(file)
      .subscribe({
        next: (data) => {
          this.foto = data;

          this.toastService.presentToast({
            detalhe: `Arquivo anexado!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO,
            titulo: `Sucesso!`
          });
        },
      })
  }

  get currentFoto() {
    return this.foto || undefined;
  }

  update() {

    const tempo_sla = this.form.get('tempo_sla').value;
    const descricoes_servico = this.form.get('descricoes_servico').value;
    const produtos_utilizados = this.form.get('produtos_utilizados').value;
    const observacoes_servico = this.form.get('observacoes_servico').value;
    const nome_empresa = this.form.get('nome_empresa').value;
    const observacao_geral = this.form.get('observacao_geral').value;

    const executor_id = this.form.get('executor_id').value || null;
    const foto_id = this.currentFoto.id || null;

    console.log({
      tempo_sla,
      descricoes_servico,
      produtos_utilizados,
      observacao_geral,
      observacoes_servico,
      nome_empresa,
      executor_id,
      foto_id,
    });

    const sub = this.chamadoService.update(this.chamado.id, {
      tempo_sla,
      descricoes_servico,
      produtos_utilizados,
      observacao_geral,
      observacoes_servico,
      nome_empresa,
      executor_id,
      foto_id,
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
