import { LocalAgendamento, LocalAgendamentoItens } from './../../../../constants/agendamento.constant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { NavigationExtras, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';

import { FileUtils } from './../../../../utils/FileUtils';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { PageOrder } from './../../../../constants/page.constant';
import { CondominioService } from '../../../../services/condominio/condominio.service';
import { LocalPedido, LocalPedidoEnum, StatusPedido, StatusPedidoEnum } from './../../../../constants/status-pedido.constant';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { UserService } from './../../../../services/user/user.service';
import { FuncionarioProfileComponent } from '../../../adm-recurso-module/funcionarios/funcionario-profile/funcionario-profile.component';

import { PrestacaoServicoDto } from './../../../../interfaces/servicos/prestacao-servico.dto';
import { StatusServico, StatusServicoEnum } from './../../../../constants/status.constant';
import { PrestacaoServicosService } from './../../../../services/prestacao-servicos/prestacao-servicos.service';
import { PrestacaoServicoDetailComponent } from '../prestacao-servico-detail/prestacao-servico-detail.component';


@Component({
  selector: 'app-prestacao-servico-main',
  templateUrl: './prestacao-servico-main.component.html',
  styleUrls: ['./prestacao-servico-main.component.scss'],
})
export class PrestacaoServicoMainComponent implements OnInit, OnDestroy {

  prestacoesServico: PageableDto<PrestacaoServicoDto>;
  searchedPrestacaoServico = '';

  searchedCondominio: string;
  sortcondominios: SelectItem[] = [];

  colaboradores: PageableDto<UserDto>;
  searchedColaborador: string;

  clientes: PageableDto<UserDto>;
  searchedCliente: string;

  selectedStatus: StatusServicoEnum;
  sortStatus: SelectItem[] = [];

  selectedLocal: LocalAgendamento;
  sortLocais: SelectItem[] = [];

  currentPage = 1;
  pageOrder = PageOrder.DESC;
  currentTake = 5;

  min_total: number = 0;
  max_total: number = 0;
  selectedDate: Date;

  cols: any[];
  exportColumns: any[];

  private subscriptions = new Subscription();

  constructor(
    private readonly prestacaoServicosService: PrestacaoServicosService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly router: Router,
    private readonly condominioService: CondominioService,
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
    this.sortStatus = [...StatusServico];
    this.sortLocais = [...LocalAgendamentoItens];

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'condominio.nome', header: 'condominio' },
      { field: 'cliente.nome', header: 'Cliente' },
      { field: 'colaborador.nome', header: 'Colaborador' },
      { field: 'total_devido', header: 'Total do Serviço' },
      { field: 'status_servico', header: 'Status' },
      { field: 'local', header: 'Local' },
      { field: 'created_at', header: 'Data de Criação' }
    ];

    this.exportColumns = this.cols.map(col => {
      return { title: col.header, dataKey: col.field };
    });

    this.loadPrestacoesServico();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadPrestacoesServico(page: number = 1, dt?: Table) {
    const sub = this.prestacaoServicosService.list({
      searchedPrestacaoServico: this.searchedPrestacaoServico,
      searchedCondominio: this.searchedCondominio,
      status_servico: this.selectedStatus,
      searchedCliente: this.searchedCliente,
      searchedColaborador: this.searchedColaborador,
      min_total: Number(this.min_total),
      max_total: Number(this.max_total),
      created_at: this.selectedDate,
      local: this.selectedLocal,
    },
      { order: this.pageOrder, page, take: this.currentTake })
      .subscribe(data => {
        this.prestacoesServico = data;
      },
        () => { },
        () => {
          if (dt) {
            dt.paginator = true;
          }
        }
      );

    this.subscriptions.add(sub);
  }

  paginar(event, dt: Table) {
    // this.pedidos = undefined;
    dt.paginator = false;
    const { first, rows, sortOrder } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    this.doFilter(event);

    this.currentPage = page;
    this.currentTake = rows;
    this.pageOrder = sortOrder && sortOrder == 1 ? PageOrder.DESC : PageOrder.ASC;

    this.loadPrestacoesServico(page, dt);
  }

  doFilter(event) {
    if (!event || !event.filters || !event.filters.id) {
      return;
    }
    const { id, cliente, colaborador, created_at, condominio, status, local } = event.filters;
    if (this.min_total > this.max_total) {
      this.max_total = undefined;
    }

    if (id[0].value) {
      this.searchedPrestacaoServico = id[0].value;
    } else {
      this.searchedPrestacaoServico = undefined;
    }

    if (cliente[0].value) {
      this.searchedCliente = cliente[0].value;
    } else {
      this.searchedCliente = undefined;
    }

    if (colaborador[0].value) {
      this.searchedColaborador = colaborador[0].value;
    } else {
      this.searchedColaborador = undefined;
    }

    if (status[0].value) {
      this.selectedStatus = status[0].value;
    } else {
      this.selectedStatus = undefined;
    }

    if (local[0].value) {
      this.selectedLocal = local[0].value;
    } else {
      this.selectedLocal = undefined;
    }

    if (created_at[0].value) {
      this.selectedDate = created_at[0].value;
    } else {
      this.selectedDate = undefined;
    }

    if (condominio[0].value) {
      this.searchedCondominio = condominio[0].value;
    } else {
      this.searchedCondominio = undefined;
    }

  }

  clearTotal() {
    this.min_total = undefined;
    this.max_total = undefined;
    this.loadPrestacoesServico(1);
  }

  exportPdf() {
    const fileName = `Pedidos - ${new Date().toLocaleDateString()}`;
    const head = this.cols.map(c => c.header);
    const body = this.convertPrestacaoServicoData().map(Object.values);


    FileUtils.exportPdf(fileName, head, body);
  }

  exportExcel() {
    const fileName = `Pedidos - ${new Date().toLocaleDateString()}`;
    FileUtils.exportExcel(fileName, this.convertPrestacaoServicoData());
  }

  exportCsv() {
    const fileName = `Pedidos - ${new Date().toLocaleDateString()}`;
    FileUtils.exportCSV(fileName, this.convertPrestacaoServicoData());
  }


  detail(prestacaoServico: PrestacaoServicoDto) {
    this.showModal(PrestacaoServicoDetailComponent, { selectedPrestacaoServico: prestacaoServico });
  }

  openColaborador(user_id: string) {
    this.showModal(FuncionarioProfileComponent, { user_id });
  }

  openCliente(user_id: string) {
    //this.showModal(ClienteProfileComponent, { user_id });
  }

  private convertPrestacaoServicoData() {
    const data = this.prestacoesServico.data.map(p => {
      return {
        id: p.id,
        condominio: p.condominio.nome,
        cliente: p.cliente.nome,
        colaborador: p.colaborador.nome,
        total_prestacao: p.total_devido,
        status: p.status_servico,
        local: p.local,
        data_criacao: new Date(p.created_at).toLocaleDateString(),
      }
    });

    return data;
  }

  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps
  ) {
    const modal = await this.modal.create({
      component,
      backdropDismiss: false,
      componentProps,
    });

    modal.onDidDismiss()
      .then((data) => {
        const { data: hasUpdate, role } = data;

        if (hasUpdate) {
          this.loadPrestacoesServico(this.currentPage);
          this.toastService.presentToast({
            detalhe: `Operação bem sucedida!`,
            titulo: `Sucesso!`,
            duracao: ToastEnum.mediumDuration,
            gravidade: ToastPrimeSeverityEnum.SUCESSO
          });
        }

      });

    return await modal.present();
  }
}