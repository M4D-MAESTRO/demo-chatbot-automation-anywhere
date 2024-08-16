import { LojaService } from './../../../../services/loja/loja.service';
import { LojaDto } from 'src/app/shared/interfaces/lojas/loja.dto';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';

import { PerfilDto } from '../../../../../shared/interfaces/perfis/perfil.dto';
import { PerfilService } from '../../../../../shared/services/perfil/perfil.service';
import { UserService } from '../../../../../shared/services/user/user.service';
import { PageOrder } from './../../../../constants/page.constant';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { Role } from './../../../../constants/role.constants';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ColaboradorBriefComponent } from '../../../utils/briefs/colaborador-brief/colaborador-brief.component';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../../shared/constants/toast.constant';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.scss'],
})
export class FuncionarioCadastroComponent implements OnInit, OnDestroy {
  
  form: UntypedFormGroup;
  perfis: PageableDto<PerfilDto>;
  currentPerfilTake = 15;

  lojas: PageableDto<LojaDto>;
  selectedLoja: string;
  currentLojasPage = 1;
  searchedLoja = '';
  isLoaded = false;

  steps: MenuItem[];
  stepIndex = 0;

  createdUserId = '';
  userWasCreated = false;

  isCliente = false;

  maxDate: Date = new Date();

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly userService: UserService,
    private readonly lojaService: LojaService,
    private readonly perfilService: PerfilService,
    private readonly modalCadastro: ModalController,
    private readonly toastService: ToastMessageService,

  ) {
    this.form = this.formBuilder.group({
      nome: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      cpf: [, [Validators.required,]],

      identidade: [, [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
      tel1: [, [Validators.required,]],
      tel2: [, []],
      data_nascimento: [, [Validators.required,]],

      perfil_id: [, [Validators.required,]],

      Loja_id: [, []],
    });
  }

  ngOnInit() {
    this.steps = [
      {
        label: 'Informações',
      },
      {
        label: 'Endereço',
      },
    ];
    //this.loadLojas();
    this.loadPerfis();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadPerfis(page = 1) {
    const sub = this.perfilService.list({ order: PageOrder.ASC, page, take: 15 }, { with_usuario: false })
      .subscribe(data => {
        this.perfis = data;
      });
    this.subscriptions.add(sub);
  }

  lazyLoadPerfis(dropdown: Dropdown) {
    this.currentPerfilTake += 5;
    const sub = this.perfilService.list({ order: PageOrder.ASC, page: 1, take: this.currentPerfilTake }, { with_usuario: false })
      .subscribe(data => {
        this.perfis = data;
        dropdown.show();
      });
    this.subscriptions.add(sub);
  }


  loadLojas(page = 1, dropdown?: Dropdown) {
    const sub = this.lojaService.list(
      { searchedLoja: this.searchedLoja },
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.lojas = data;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  searchLoja(dropdown?: Dropdown) {
    this.loadLojas(1, dropdown);
  }
  paginarLojas(event, dropdown?: Dropdown) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentLojasPage) {
      this.currentLojasPage = page;
      this.loadLojas(page, dropdown);
    }
  }

  create() {
    const nome = this.form.get('nome').value;
    const email = this.form.get('email').value;
    const cpf = this.form.get('cpf').value;
    const identidade = this.form.get('identidade').value;
    const tel1 = this.form.get('tel1').value;
    const tel2 = this.form.get('tel2').value;
    const data_nascimento = this.form.get('data_nascimento').value;

    const { id: perfil_id } = this.form.get('perfil_id').value;
    // const { id: Loja_id } = this.form.get('Loja_id').value;

    const sub = this.userService.createUser({
      nome, email, cpf, perfil_id, identidade, tel1, tel2, data_nascimento
    })
      .subscribe(response => {
        this.createdUserId = response.id;
        this.userWasCreated = true;
        this.stepIndex++;
      });
    this.subscriptions.add(sub);
  }

  changePerfil(event) {
    const nome = this.form.get('perfil_id').value?.nome || undefined;

    if (nome == Role.CLIENTE) {
      this.isCliente = true;
      return;
    }

    this.isCliente = false;
  }

  listenEndereco(event) {
    this.fechar(this.userWasCreated);
  }

  fechar(userWasCreated = false) {
    this.modalCadastro.dismiss(this.userWasCreated);
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
