import { FilesService } from './../../../../services/utils/files/files.service';

import { ComponentProps, ComponentRef } from '@ionic/core';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import * as saveAs from 'file-saver';
import SignaturePad from 'signature_pad';


import { PageOrder } from './../../../../constants/page.constant';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';

import { EncomendaDto } from './../../../../interfaces/encomendas/encomenda.dto';
import { UserService } from './../../../../services/user/user.service';
import { TipoUsuarioEnum } from './../../../../constants/tipo-user.constant';
import { EncomendasService } from './../../../../services/encomendas/encomendas.service';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { ImovelDto } from './../../../../interfaces/imoveis/imovel.dto';
import { ImovelService } from './../../../../services/imovel/imovel.service';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { AnexosService } from './../../../../services/anexos/anexos.service';
import { EncomendaStatus } from './../../../../constants/encomenda.constant';

@Component({
  selector: 'app-encomenda-finalizar',
  templateUrl: './encomenda-finalizar.component.html',
  styleUrls: ['./encomenda-finalizar.component.scss'],
})
export class EncomendaFinalizarComponent implements OnInit, OnDestroy {

  @Input()
  encomenda: EncomendaDto;



  form: UntypedFormGroup;

  encomendas: PageableDto<EncomendaDto>;
  EncomendaStatus = EncomendaStatus;

  users: PageableDto<UserDto>;
  selectedUser: UserDto;
  searchedUser = '';

  imoveis: PageableDto<ImovelDto>;
  searchedApartamento = '';
  selectedImovel: ImovelDto;

  selectedEncomenda: string;
  currentEncomendasPage = 1;
  searchedEncomenda = '';
  isLoaded = false;

  enableSignPad = false;

  wasCreated = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly encomendaService: EncomendasService,
    private readonly imoveisService: ImovelService,
    private readonly userService: UserService,
    private readonly modalCadastro: ModalController,
    private readonly toastService: ToastMessageService,
    public readonly anexosService: AnexosService,
    private readonly filesService: FilesService,
  ) { }

  ngOnInit() {
    const { codigo_rastreio, nf_rastreio, nome_remetente, user_associado } = this.encomenda;

    this.form = this.formBuilder.group({
      imovel_id: [, []],

      codigo_rastreio: [codigo_rastreio, [Validators.minLength(3),]],
      nf_rastreio: [nf_rastreio, [Validators.minLength(3),]],
      nome_remetente: [nome_remetente, [Validators.required, Validators.minLength(3),]],
      user_associado_id: [user_associado?.id || undefined, []],
    });

    this.loadUsers(1);
    this.loadImoveis(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.anexosService.clearFile();
  }


  //#region USERS
  loadUsers(page = 1) {
    const sub = this.userService.listUsers(
      { searchedUser: this.searchedUser, tipo_usuario: TipoUsuarioEnum.USUARIO, },
      { order: PageOrder.DESC, page, take: 10 }
    )
      .subscribe(response => {
        this.users = response;
        if (this.encomenda.user_associado) {
          this.users.data.push(this.encomenda.user_associado);
        }
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

  //#region IMOVEIS
  loadImoveis(page = 1) {
    const sub = this.imoveisService.list(
      { searched_apartamento: this.searchedApartamento, },
      { order: PageOrder.DESC, page, take: 5 }
    )
      .subscribe(response => {
        this.imoveis = response;

      });
    this.subscriptions.add(sub);
  }

  paginarImovel({ value }) {

    this.searchedApartamento = undefined;
    if (value) {
      this.searchedApartamento = value;
    }
    this.loadImoveis(1);
  }

  //#endregion


  //#region Encomendas

  loadEncomendas(page = 1, dropdown?: Dropdown) {
    const sub = this.encomendaService.list(
      { searched_encomenda: this.searchedEncomenda, },
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.encomendas = data;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  searchEncomenda(dropdown?: Dropdown) {
    this.loadEncomendas(1, dropdown);
  }
  paginarEncomendas(event, dropdown?: Dropdown) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentEncomendasPage) {
      this.currentEncomendasPage = page;
      this.loadEncomendas(page, dropdown);
    }
  }

  //#endregion


  finalizar() {
    const file = this.anexosService.getFileSelected();

    const sub = this.encomendaService.createComprovante(file)
      .subscribe(data => {
        const { id: comprovante_id } = data;
        const sub = this.encomendaService.finalizar(this.encomenda.id, {
          recebedor_final_id: this.selectedUser.id,
          comprovante_id,
        })
          .subscribe(response => {
            this.wasCreated = true;
            this.fechar();
          });
        this.subscriptions.add(sub);

      });
    this.subscriptions.add(sub);
  }

  async baixarComprovante() {
    const comprovante = this.anexosService.getFileSelected();
    await this.filesService.saveFile(comprovante);
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
    const situacao = !this.selectedUser || !this.anexosService.getFileSelected();

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
