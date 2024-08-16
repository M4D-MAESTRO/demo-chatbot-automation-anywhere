import { ChamadoReportService } from './../../../../services/relatorio/chamado-report/chamado-report.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';

import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';

import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../../shared/constants/toast.constant';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { PageOptionsDto, PageableDto } from './../../../../interfaces/others/pageable.dto';
import { PageOrder } from './../../../../constants/page.constant';
import { FilesService } from './../../../../services/utils/files/files.service';
import { ChamadoStatusEnum, ChamadoStatusList, ChamadoTipoEnum, ChamadoTipoList } from '../../../../constants/chamado.constant';
import { ChamadoDto, SearchChamadoDto } from './../../../../interfaces/chamados/chamado.dto';
import { ChamadoService } from './../../../../services/chamado/chamado.service';

import { ChamadoCadastroComponent } from '../chamado-cadastro/chamado-cadastro.component';
import { ChamadoStatusComponent } from '../chamado-status/chamado-status.component';
import { ChamadoDetailComponent } from '../chamado-detail/chamado-detail.component';
import { ChamadoUpdateComponent } from '../chamado-update/chamado-update.component';

@Component({
  selector: 'app-chamado-main',
  templateUrl: './chamado-main.component.html',
  styleUrls: ['./chamado-main.component.scss'],
})
export class ChamadoMainComponent implements OnInit, OnDestroy {
  chamados: PageableDto<ChamadoDto>;
  isLoaded = false;
  currentCondominioLoaded: string;
  searchedChamado = '';
  selectedCondominio = '';
  selectedStatus: ChamadoStatusEnum;
  currentPage = 1;
  selectedChamado: ChamadoDto;
  selectedChamados: ChamadoDto[] = [];

  ChamadoStatusEnum = ChamadoStatusEnum;
  ChamadoTipoEnum = ChamadoTipoEnum;

  searchDto: SearchChamadoDto = {};
  pageOptions: PageOptionsDto = { order: PageOrder.ASC, take: 5, page: 1 };

  filtros = {
    status: ChamadoStatusList,
    tipo: ChamadoTipoList,
  }

  opcoesMenuItens: MenuItem[] = [
    {
      label: 'Opções',
      items: [
        {
          label: 'Criar novo',
          icon: 'pi pi-plus',
          command: () => this.createNew(),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Baixar',
      items: [
        {
          label: 'CSV',
          icon: 'pi pi-file-o',
          command: () => this.exportCsv(),
        },
        {
          label: 'XLSX',
          icon: 'pi pi-file-excel',
          command: () => this.exportExcel(),
        }
      ]
    }
  ];

  opcoesChamadoItens: MenuItem[] = [
    {
      label: 'Opções',
      items: [
        {
          label: 'Detalhar',
          icon: 'pi pi-search',
          command: () => this.detalharAtualizar(this.selectedChamado),
        },
        {
          label: 'Alterar status',
          icon: 'pi pi-verified',
          command: () => this.detalharStatus(this.selectedChamado),
        },
      ],
    },
    {
      separator: true,
    },
    {
      items: [
        {
          label: 'Baixar arquivo',
          icon: 'pi pi-cloud-download',
          command: () => this.baixarFoto(this.selectedChamado),
        },
      ]
    }
  ];

  private subscriptions = new Subscription();

  constructor(
    private readonly chamadoService: ChamadoService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly filesService: FilesService,
    private readonly chamadoReportService: ChamadoReportService,
  ) { }

  ngOnInit() {
    this.loadChamados();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeFiltro({ value }) {
    this.selectedStatus = value;
    this.loadChamados(1);
  }

  //#region Chamados

  changeCondominio({ value }) {
    this.selectedCondominio = value;
    this.loadChamados(1);
  }

  clearFilter() {
    this.loadChamados(1);
  }

  clearAllFilters(event, dropdown_filtro: Dropdown) {
    this.searchedChamado = undefined;
    this.selectedCondominio = undefined;
    this.selectedStatus = undefined;

    dropdown_filtro.writeValue(null);

    this.loadChamados(1);
  }


  loadChamados(page: number = 1, dt?: Table) {
    const sub = this.chamadoService.list(this.searchDto, this.pageOptions)
      .subscribe({
        next: data => {
          this.chamados = data;
        },
        error: () => { },
        complete: () => {
          if (dt) {
            dt.paginator = true;
          }
        }
      });

    this.subscriptions.add(sub);
  }

  paginar(event, dt: Table) {
    dt.paginator = false;
    const { first, rows, sortOrder } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    this.doFilter(event);

    this.pageOptions.page = page;
    this.pageOptions.take = rows;
    this.pageOptions.order = sortOrder && sortOrder == 1 ? PageOrder.DESC : PageOrder.ASC;

    this.loadChamados(page, dt);
  }

  doFilter(event) {
    if (!event || !event.filters || !event.filters.id) {
      return;
    }
    const { id, observacao_geral, solicitante, created_at, executor, status, tipo, closed_at } = event.filters;
    console.log(event.filters);

    if (id[0]?.value) {
      this.searchDto.searched_chamado = id[0].value;
    } else {
      this.searchDto.searched_chamado = undefined;
    }

    if (observacao_geral[0]?.value) {
      this.searchDto.observacao_geral = observacao_geral[0].value;
    } else {
      this.searchDto.observacao_geral = undefined;
    }

    if (solicitante[0]?.value) {
      this.searchDto.solicitante_id = solicitante[0].value;
    } else {
      this.searchDto.solicitante_id = undefined;
    }

    if (executor[0]?.value) {
      this.searchDto.executor_id = executor[0].value;
    } else {
      this.searchDto.executor_id = undefined;
    }

    if (status[0]?.value) {
      this.searchDto.status = status[0].value;
    } else {
      this.searchDto.status = undefined;
    }

    if (tipo[0]?.value) {
      this.searchDto.tipo = tipo[0].value;
    } else {
      this.searchDto.tipo = undefined;
    }
    if (created_at[0]?.value) {
      this.searchDto.min_data_created = created_at[0].value;
    } else {
      this.searchDto.min_data_created = undefined;
    }

    if (created_at[1]?.value) {
      this.searchDto.max_data_created = created_at[1].value;
    } else {
      this.searchDto.max_data_created = undefined;
    }

    if (closed_at[0]?.value) {
      this.searchDto.min_data_closed = closed_at[0].value;
    } else {
      this.searchDto.min_data_closed = undefined;
    }

    if (closed_at[1]?.value) {
      this.searchDto.max_data_closed = closed_at[1].value;
    } else {
      this.searchDto.max_data_closed = undefined;
    }

  }

  //#endregion

  detalharStatus(chamado: ChamadoDto) {
    const { status } = chamado;
    if (status == ChamadoStatusEnum.CANCELADO || status == ChamadoStatusEnum.CONCLUIDO) {
      this.showModal(ChamadoDetailComponent, { chamado });
    } else {
      this.showModal(ChamadoStatusComponent, { chamado });
    }

  }

  detalharAtualizar(chamado: ChamadoDto) {
    const { status } = chamado;
    if (status == ChamadoStatusEnum.CANCELADO || status == ChamadoStatusEnum.CONCLUIDO) {
      this.showModal(ChamadoDetailComponent, { chamado });
    } else {
      this.showModal(ChamadoUpdateComponent, { chamado });
    }
  }

  async baixarFoto(chamado: ChamadoDto) {
    const { foto_url, foto } = chamado;

    if (!foto_url) {
      this.toastService.presentToast({
        titulo: 'Não disponível',
        detalhe: 'Sem foto disponível para download',
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO,
      });
      return;
    }
    await this.filesService.saveUrlFile(foto_url, foto.nome);
  }

  createNew() {
    this.showModal(ChamadoCadastroComponent);
  }

  search() {
    this.loadChamados(1);
  }

  async exportExcel() {
    const fileName = `Chamados - ${new Date().toLocaleDateString()}`;
    await this.chamadoReportService.exportExcel(fileName, this.chamados.data);
  }

  async exportCsv() {
    const fileName = `Chamados - ${new Date().toLocaleDateString()}`;
    await this.chamadoReportService.exportCSV(fileName, this.chamados.data);
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
      this.loadChamados();
      if (hasUpdate) {
        this.toastService.presentToast({
          titulo: 'Sucesso',
          detalhe: 'Operação bem sucedida!',
          duracao: ToastEnum.mediumDuration,
          gravidade: ToastPrimeSeverityEnum.SUCESSO,
        });
      }
    });

    return await modal.present();
  }
}
