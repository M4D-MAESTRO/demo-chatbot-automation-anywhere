
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';

import { PageOrder } from './../../../../constants/page.constant';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';

import { CondominioDto } from '../../../../interfaces/condominios/condominio.dto';
import { CondominioService } from '../../../../services/condominio/condominio.service';
import { UserService } from './../../../../services/user/user.service';
import { ImovelService } from './../../../../services/imovel/imovel.service';
import { TipoMoradorEnum, TipoUsuarioEnum } from './../../../../constants/tipo-user.constant';
import { UserDto } from './../../../../interfaces/users/user.dto';

@Component({
  selector: 'app-imovel-cadastro',
  templateUrl: './imovel-cadastro.component.html',
  styleUrls: ['./imovel-cadastro.component.scss'],
})
export class ImovelCadastroComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;

  condominios: PageableDto<CondominioDto>;
  selectedCondominio: string;
  currentCondominiosPage = 1;
  searchedCondominio = '';
  isLoaded = false;

  TipoMoradorEnum = TipoMoradorEnum;

  preponentes1: PageableDto<UserDto>;
  preponentes2: PageableDto<UserDto>;
  preponentes3: PageableDto<UserDto>;
  inquilinos: PageableDto<UserDto>;
  proprietariosRepasse: PageableDto<UserDto>;

  searchedUser = '';

  wasCreated = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly imovelService: ImovelService,
    private readonly condominioService: CondominioService,
    private readonly modalCadastro: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly userService: UserService,
  ) {
    this.form = this.formBuilder.group({
      numero_rgi: [, [Validators.required, Validators.minLength(6), Validators.pattern(/^\d+$/)]],
      numero_iptu: [, [Validators.required, Validators.minLength(7), Validators.pattern(/^\d+$/)]],
      numero_bloco: [, [Validators.required, Validators.pattern(/^\d+$/)]],
      nome_bloco: [, [Validators.minLength(3),]],
      apartamento_casa: [, [Validators.required, Validators.pattern(/^\d+$/)]],

      preponente1_id: [, [Validators.required,]],
      preponente2_id: [, []],
      preponente3_id: [, []],
      inquilino_id: [, []],
      proprietario_repasse_id: [, []],
    });
  }

  ngOnInit() {
    // this.loadCondominios();
    this.loadUsers(1, TipoMoradorEnum.PREPONENTE1);
    this.loadUsers(1, TipoMoradorEnum.INQUILINO);
    this.loadUsers(1, TipoMoradorEnum.REPASSE);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  //#region USERS
  loadUsers(page = 1, tipoMoradorEnum: TipoMoradorEnum = TipoMoradorEnum.PREPONENTE1) {
    const sub = this.userService.listUsers(
      { searchedUser: this.searchedUser, tipo_usuario: TipoUsuarioEnum.USUARIO },
      { order: PageOrder.DESC, page, take: 10 }
    )
      .subscribe(response => {
        switch (tipoMoradorEnum) {
          case TipoMoradorEnum.PREPONENTE1:
            this.preponentes1 = response;
            break;

          case TipoMoradorEnum.PREPONENTE2:
            this.preponentes2 = response;
            break;

          case TipoMoradorEnum.PREPONENTE3:
            this.preponentes3 = response;
            break;

          case TipoMoradorEnum.INQUILINO:
            this.inquilinos = response;
            break;

          case TipoMoradorEnum.REPASSE:
            this.proprietariosRepasse = response;
            break;
        }

      });
    this.subscriptions.add(sub);
  }

  paginarUser({ value }, tipoMoradorEnum: TipoMoradorEnum) {
    this.searchedUser = undefined;
    if (value) {
      this.searchedUser = value;
    }
    this.loadUsers(1, tipoMoradorEnum);
  }

  clearPreponentes3(){
    this.form.get('preponente3_id').setValue(undefined);
    this.preponentes3 = undefined;
  }
  //#endregion


  //#region Condominios

  loadCondominios(page = 1, dropdown?: Dropdown) {
    const sub = this.condominioService.list(
      { searchedCondominio: this.searchedCondominio, },
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.condominios = data;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  searchCondominio(dropdown?: Dropdown) {
    this.loadCondominios(1, dropdown);
  }
  paginarCondominios(event, dropdown?: Dropdown) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentCondominiosPage) {
      this.currentCondominiosPage = page;
      this.loadCondominios(page, dropdown);
    }
  }

  //#endregion

  create() {

    const numero_rgi = this.form.get('numero_rgi').value;
    const numero_iptu = this.form.get('numero_iptu').value;
    const numero_bloco = Number(this.form.get('numero_bloco').value);
    const nome_bloco = this.form.get('nome_bloco').value || null;
    const apartamento_casa = Number(this.form.get('apartamento_casa').value);

    const preponente1_id = this.form.get('preponente1_id').value?.id;
    const preponente2_id = this.form.get('preponente2_id').value?.id;
    const preponente3_id = this.form.get('preponente3_id').value?.id;
    const inquilino_id = this.form.get('inquilino_id').value?.id;
    const proprietario_repasse_id = this.form.get('proprietario_repasse_id').value?.id;

    const sub = this.imovelService.create({
      numero_rgi,
      numero_iptu,
      numero_bloco,
      nome_bloco,
      apartamento_casa,

      preponente1_id,
      preponente2_id,
      preponente3_id,
      inquilino_id,
      proprietario_repasse_id,
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
