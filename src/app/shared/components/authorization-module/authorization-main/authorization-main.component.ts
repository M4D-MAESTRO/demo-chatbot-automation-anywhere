import { Component, EventEmitter, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { AutorizacaoExplicitasService } from './../../../services/authorizations/autorizacao-explicitas/autorizacao-explicitas.service';
import { UserDto } from './../../../interfaces/users/user.dto';
import { AutorizacaoExplicitaDto } from './../../../interfaces/authorizations/autorizacao-explicita.dto';
import { PageableDto } from './../../../../shared/interfaces/others/pageable.dto';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../shared/constants/toast.constant';
import { ToastMessageService } from './../../../../shared/services/toast/toast-message.service';
import { AuthorizationSelectionComponent } from '../authorization-selection/authorization-selection.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authorization-main',
  templateUrl: './authorization-main.component.html',
  styleUrls: ['./authorization-main.component.scss'],
})
export class AuthorizationMainComponent implements OnInit, OnDestroy {

  @Input()
  user: UserDto;

  autorizacoes: AutorizacaoExplicitaDto[] = [];
  selectedAutorizacao: AutorizacaoExplicitaDto;

  sortOptions: SelectItem[] = [];
  searchedPlano: string = '';
  currentPage = 1;

  isLoaded = false;

  menuItens: MenuItem[] = [{
    label: 'Opções',
    items: [
      {
        label: 'Detalhar',
        icon: 'pi pi-search',
        command: () => this.showDialog = true,
      },
      {
        label: 'Remover',
        icon: 'pi pi-times',
        command: () => this.removeAuthorization(this.selectedAutorizacao),
      }
    ]
  }
  ];

  showDialog = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly autorizacaoExplicitasService: AutorizacaoExplicitasService,
    private readonly modalAuthorizationMain: ModalController,
    private readonly toastService: ToastMessageService,
  ) { }

  ngOnInit() {
    this.loadByUserAutorizado();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadByUserAutorizado() {
    const { id } = this.user;
    const sub = this.autorizacaoExplicitasService.listByUserAutorizadoId(id)
      .subscribe(data => {
        this.autorizacoes = data;
        this.isLoaded = true;
      });

    this.subscriptions.add(sub);
  }

  createNew() {
    const { id: user_id } = this.user;
    this.showModal(AuthorizationSelectionComponent, { user_id, currentAutorizacoes: this.autorizacoes });
  }

  removeAuthorization(autorizacao: AutorizacaoExplicitaDto) {
    const index = this.autorizacoes.findIndex(a => a.id == autorizacao.id);

    if (index < 0) {
      return;
    }

    const newAutorizacoes = this.autorizacoes.splice(index, 1).map(a => a.id);
    const { id } = this.user;
    this.autorizacaoExplicitasService.createForUser(id, {
      justificativa: 'Remoção de acesso selecionado',
      funcionalidades_id: newAutorizacoes
    })
      .subscribe(
        {
          next: () => {
            this.toastService.presentToast({
              titulo: `Sucesso`,
              detalhe: `Removido com sucesso`,
              duracao: ToastEnum.shortDuration,
              gravidade: ToastPrimeSeverityEnum.SUCESSO
            });
            this.loadByUserAutorizado();
          }
        }
      );
  }

  fechar(wasCreated = false) {
    this.modalAuthorizationMain.dismiss(wasCreated);
  }

  closeDialog() {
    this.showDialog = false;
  }


  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modalAuthorizationMain.create({
      component,
      backdropDismiss: false,
      cssClass: 'modal-size-80',
      componentProps,
      id: 'selection'
    });

    modal.onDidDismiss()
      .then((data) => {
        const { data: hasUpdate, role } = data;
        console.log(hasUpdate);

        if (hasUpdate) {
          this.toastService.presentToast({
            detalhe: `Operação bem sucedida!`,
            titulo: `Sucesso!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO
          });
          this.loadByUserAutorizado();
        }

      });

    return await modal.present();
  }

}
