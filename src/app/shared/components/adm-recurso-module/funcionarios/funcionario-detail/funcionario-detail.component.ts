import { LojaService } from 'src/app/shared/services/loja/loja.service';
import { LojaDto } from 'src/app/shared/interfaces/lojas/loja.dto';
import { ComponentRef, ComponentProps } from '@ionic/core';


import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';

import { PerfilDto } from '../../../../../shared/interfaces/perfis/perfil.dto';
import { PerfilService } from '../../../../../shared/services/perfil/perfil.service';
import { UserService } from '../../../../../shared/services/user/user.service';
import { PageOrder } from './../../../../constants/page.constant';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { StatusUser } from './../../../../constants/status.constant';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../../shared/constants/toast.constant';
import { StorageService } from './../../../../services/auth/storage.service';
import { Role } from './../../../../constants/role.constants';
import { ColaboradorBriefComponent } from '../../../utils/briefs/colaborador-brief/colaborador-brief.component';

@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.scss'],
})
export class FuncionarioDetailComponent implements OnInit, OnDestroy {

  @Input()
  user: UserDto;

  @Input()
  isModal = true;

  @Output()
  updatedEvent: EventEmitter<any> = new EventEmitter();

  form: UntypedFormGroup;
  perfis: PageableDto<PerfilDto>;
  currentPerfilTake = 15;

  lojas: PageableDto<LojaDto>;
  selectedloja: string;
  currentlojasPage = 1;
  searchedloja = '';
  isLoaded = false;


  superiores: PageableDto<UserDto>;
  searchedSuperior = '';
  selectedSuperior: UserDto;
  showSuperiorDialog = false;

  steps: MenuItem[];
  stepIndex = 0;

  createdUserId = '';
  userWasCreated = false;
  sortStatus = StatusUser;

  maxDate: Date = new Date();

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly userService: UserService,
    private readonly lojaService: LojaService,
    private readonly perfilService: PerfilService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly toastMessageService: ToastMessageService,
    private readonly storage: StorageService,
    private readonly modalDetail: ModalController,
  ) { }

  ngOnInit() {

    this.loadlojas();
    this.loadPerfis();

    const { nome, status, loja, perfil, identidade, tel1, tel2, data_nascimento } = this.user;
    const loja_id = loja?.id || undefined;
    console.log(data_nascimento);
    this.form = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      status: [status, [Validators.required,]],
      perfil_id: [perfil, [Validators.required,]],
      loja_id: [loja_id, [Validators.required,]],

      identidade: [identidade, [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
      tel1: [tel1, [Validators.required,]],
      tel2: [tel2, [Validators.required,]],
      data_nascimento: [new Date(data_nascimento), [Validators.required,]],
    });
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

  loadlojas(page = 1, dropdown?: Dropdown) {
    const sub = this.lojaService.list(
      { searchedLoja: this.searchedloja },
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.lojas = data;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  searchloja(dropdown?: Dropdown) {
    this.loadlojas(1, dropdown);
  }
  paginarlojas(event, dropdown?: Dropdown) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentlojasPage) {
      this.currentlojasPage = page;
      this.loadlojas(page, dropdown);
    }
  }


  update() {

    /*
    if (!this.checkUpdatePermission()) {
      this.toastService.presentToast({
        titulo: 'Não autorizado',
        detalhe: `Apenas ${Role.ADMIN} e ${Role.GERENTE} podem atualizar essas informações`,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO
      });
      return;
    }
    */

    const { id } = this.user;
    const nome = this.form.get('nome').value;
    const status = this.form.get('status').value;
    const { id: perfil_id } = this.form.get('perfil_id').value;
    //const loja_id = this.form.get('loja_id').value;

    const identidade = this.form.get('identidade').value;
    const tel1 = this.form.get('tel1').value;
    const tel2 = this.form.get('tel2').value;
    const data_nascimento = this.form.get('data_nascimento').value;

    const sub = this.userService.updateUser({
      nome, perfil_id, identidade, tel1, tel2, data_nascimento, status
    }, id)
      .subscribe(response => {
        this.user = response;
        this.createdUserId = response.id;
        this.userWasCreated = true;
        if (this.isModal) {
          this.fechar(true);
        } else {
          this.toastService.presentToast({
            titulo: 'Sucesso',
            detalhe: 'Operação bem sucedida!',
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO
          });
          this.updatedEvent.emit(this.user);
        }
      });
    this.subscriptions.add(sub);
  }

  uploadFile(event, fileUpload: FileUpload) {
    const { id: updated_user_id } = this.user;
    const { id: local_user_id } = this.storage.getLocalUser();

    if (!(updated_user_id == local_user_id || this.checkUpdatePermission())) {
      console.log('entrou');
      this.toastService.presentToast({
        titulo: 'Não autorizado',
        detalhe: `Apenas ${Role.ADMIN} e ${Role.GERENTE} podem atualizar essas informações`,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO
      });
      return;
    }

    const file = event.files[0];
    const sub = this.userService.uploadAvatar(file, updated_user_id)
      .subscribe(response => {
        this.user = response;
        this.createdUserId = response.id;
        this.userWasCreated = true;
        this.toastMessageService.presentToast({
          detalhe: 'Foto alterada',
          duracao: ToastEnum.shortDuration,
          gravidade: ToastPrimeSeverityEnum.SUCESSO,
          titulo: 'Sucesso!'
        });
        this.updatedEvent.emit(this.user);
        fileUpload.clear();
      });
    this.subscriptions.add(sub);
  }

  fechar(userWasCreated = false) {
    this.modal.dismiss(this.userWasCreated);
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

  disableUpdateBtn(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

  checkUpdatePermission(): boolean {
    const role = this.storage.getRole();
    if (role == Role.GERENTE || role == Role.ADMIN) {
      return true;
    }
    return false;
  }


  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modalDetail.create({
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