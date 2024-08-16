import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';

import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';

import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../../shared/constants/toast.constant';
import { TipoUsuarioEnum } from './../../../../constants/tipo-user.constant';
import { StatusCliente, StatusUser } from './../../../../constants/status.constant';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { PageOrder } from './../../../../constants/page.constant';

import { ImovelDetailComponent } from '../imovel-detail/imovel-detail.component';
import { ImovelCadastroComponent } from '../imovel-cadastro/imovel-cadastro.component';
import { ImovelDto } from './../../../../interfaces/imoveis/imovel.dto';
import { ImovelService } from './../../../../services/imovel/imovel.service';
import { UserService } from './../../../../services/user/user.service';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { ImovelFichaComponent } from '../imovel-ficha/imovel-ficha.component';

@Component({
  selector: 'app-imovel-main',
  templateUrl: './imovel-main.component.html',
  styleUrls: ['./imovel-main.component.scss'],
})
export class ImovelMainComponent implements OnInit, OnDestroy {

  imoveis: PageableDto<ImovelDto>;
  isLoaded = false;
  currentCondominioLoaded: string;
  searchedImovel = '';
  selectedCondominio = '';
  selectedStatus = '';
  currentPage = 1;
  selectedImovel: ImovelDto;


  sortOptions: SelectItem[] = [];

  editMenuItens: MenuItem[] = [{
    label: 'Opções',
    items: [
      {
        label: 'Atualizar',
        icon: 'pi pi-pencil',
        command: () => this.detalharAtualizar(this.selectedImovel),
      },
      /* {
         label: 'Comunicação',
         icon: 'pi pi-megaphone',
         command: () => this.detalharComunicacao(this.selectedUser),
       }*/
    ]
  }
  ];

  private subscriptions = new Subscription();

  constructor(
    private readonly imovelService: ImovelService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
    //Permitir filtrar usuário por status
    this.sortOptions = [...StatusCliente];

    // this.loadCondominio();
    this.loadImoveis();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeFiltro({ value }) {
    this.selectedStatus = value;
    this.loadImoveis(1);
  }

  //#region Condominios

  changeCondominio({ value }) {
    this.selectedCondominio = value;
    this.loadImoveis(1);
  }

  clearFilter() {
    this.loadImoveis(1);
  }

  clearAllFilters(event, dropdown_Condominios: Dropdown, dropdown_filtro: Dropdown) {
    this.searchedImovel = undefined;
    this.selectedCondominio = undefined;
    this.selectedStatus = undefined;

    dropdown_Condominios.writeValue(null);
    dropdown_filtro.writeValue(null);

    this.loadImoveis(1);
  }

  loadImoveis(page = 1) {
    const sub = this.imovelService.list({
      searched_imovel: this.searchedImovel,
    },
      { order: PageOrder.DESC, page, take: 5 })
      .subscribe(response => {
        this.imoveis = response;
        this.isLoaded = true;
      });
    this.subscriptions.add(sub);
  }

  //#endregion

  detalharAtualizar(imovel: ImovelDto) {
    this.showModal(ImovelDetailComponent, { imovel });
  }

  createNew() {
    this.showModal(ImovelCadastroComponent);
  }

  openFicha({ id: imovel_id }: ImovelDto) {
    this.showModal(ImovelFichaComponent, { imovel_id });
  }

  search() {
    this.loadImoveis(1);
  }

  paginar(event) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentPage) {
      this.currentPage = page;
      this.loadImoveis(page);
    }
  }

  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modal.create({
      component,
      backdropDismiss: false,
      cssClass: 'modal-size-100',
      componentProps,
    });

    modal.onDidDismiss().then((data) => {
      const { data: hasUpdate } = data;
      this.isLoaded = false;
      this.loadImoveis();
      if (hasUpdate) {
        this.toastService.presentToast({
          titulo: 'Sucesso',
          detalhe: 'Operação bem sucedida!',
          duracao: ToastEnum.mediumDuration,
          gravidade: ToastPrimeSeverityEnum.SUCESSO
        });
      }
    });

    return await modal.present();
  }

}
