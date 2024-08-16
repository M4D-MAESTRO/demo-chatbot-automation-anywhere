import { PrestacaoServicoDetailComponent } from './../../prestacoes-servico/prestacao-servico-detail/prestacao-servico-detail.component';
import { TipoCash, TipoCashEnum, TipoTransacao, TipoTransacaoEnum } from './../../../../constants/transacao.constant';
import { TransacaoDto } from './../../../../interfaces/adm-financeiras/transacoes/transacao.dto';
import { TransacoesService } from './../../../../services/adm-financeira/transacoes/transacoes.service';
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
import { TransacoesDetailComponent } from '../transacoes-detail/transacoes-detail.component';

@Component({
  selector: 'app-transacoes-main',
  templateUrl: './transacoes-main.component.html',
  styleUrls: ['./transacoes-main.component.scss'],
})
export class TransacoesMainComponent implements OnInit, OnDestroy {

  transacoes: PageableDto<TransacaoDto>;
  searchedTransacao = '';

  searchedCondominio: string;
  sortCondominios: SelectItem[] = [];

  colaboradores: PageableDto<UserDto>;
  searchedSolicitante: string;

  clientes: PageableDto<UserDto>;
  searchedCliente: string;

  selectedTipoCash: TipoCashEnum;
  sortTipoCash: SelectItem[] = [];

  selectedTipoTransacao: TipoTransacaoEnum;
  sortTipoTransacao: SelectItem[] = [];

  currentPage = 1;
  pageOrder = PageOrder.DESC;
  currentTake = 5;

  min_total: number = 0;
  max_total: number = 0;
  selectedDate: Date;

  cols: any[];
  exportColumns: any[];
  selectedTransacoes: TransacaoDto[] = [];

  private subscriptions = new Subscription();

  constructor(
    private readonly transacoesService: TransacoesService,
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly router: Router,
    private readonly condominioService: CondominioService,
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
    this.sortTipoCash = [...TipoCash];
    this.sortTipoTransacao = [...TipoTransacao];

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'Condominio.nome', header: 'Condominio' },
      { field: 'cliente.nome', header: 'Cliente' },
      { field: 'solicitante.nome', header: 'Solicitante' },
      { field: 'valor_transacao', header: 'Valor da Transação' },
      { field: 'tipo_cash', header: 'Tipo financeiro' },
      { field: 'tipo_transacao', header: 'Tipo de Transação' },
      { field: 'id_associado', header: 'ID Associado' },
      { field: 'created_at', header: 'Data de Criação' }
    ];

    this.exportColumns = this.cols.map(col => {
      return { title: col.header, dataKey: col.field };
    });

    this.loadTransacoes();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadTransacoes(page: number = 1, dt?: Table) {
    console.log(this.searchedSolicitante);
    const sub = this.transacoesService.list({
      searchedSolicitante: this.searchedSolicitante,
      searchedCliente: this.searchedCliente,
      searchedCondominio: this.searchedCondominio,
      searchedTransacao: this.searchedTransacao,
      min_valor_transacao: Number(this.min_total),
      max_valor_transacao: Number(this.max_total),
      created_at: this.selectedDate,
      tipo_cash: this.selectedTipoCash,
      tipo_transacao: this.selectedTipoTransacao,
    },
      { order: this.pageOrder, page, take: this.currentTake })
      .subscribe(data => {
        this.transacoes = data;
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
    // this.transacoes = undefined;
    dt.paginator = false;
    const { first, rows, sortOrder } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    this.doFilter(event);

    this.currentPage = page;
    this.currentTake = rows;
    this.pageOrder = sortOrder && sortOrder == 1 ? PageOrder.DESC : PageOrder.ASC;

    this.loadTransacoes(page, dt);
  }

  doFilter(event) {
    if (!event || !event.filters || !event.filters.id) {
      return;
    }

    const { id, cliente, solicitante, created_at, Condominio, tipo_cash, tipo_transacao } = event.filters;
    if (this.min_total > this.max_total) {
      this.max_total = undefined;
    }

    if (id[0].value) {
      this.searchedTransacao = id[0].value;
    } else {
      this.searchedTransacao = undefined;
    }

    if (cliente[0].value) {
      this.searchedCliente = cliente[0].value;
    } else {
      this.searchedCliente = undefined;
    }

    if (solicitante[0].value) {
      this.searchedSolicitante = solicitante[0].value;
    } else {
      this.searchedSolicitante = undefined;
    }

    if (tipo_cash[0].value) {
      this.selectedTipoCash = tipo_cash[0].value;
    } else {
      this.selectedTipoCash = undefined;
    }

    if (tipo_transacao[0].value) {
      this.selectedTipoTransacao = tipo_transacao[0].value;
    } else {
      this.selectedTipoTransacao = undefined;
    }

    if (created_at[0].value) {
      this.selectedDate = created_at[0].value;
    } else {
      this.selectedDate = undefined;
    }

    if (Condominio[0].value) {
      this.searchedCondominio = Condominio[0].value;
    } else {
      this.searchedCondominio = undefined;
    }

  }

  clearTotal() {
    this.min_total = undefined;
    this.max_total = undefined;
    this.loadTransacoes(1);
  }

  exportPdf() {
    const fileName = `Transações - ${new Date().toLocaleDateString()}`;
    const head = this.cols.map(c => c.header);
    const body = this.convertTransacaoData().map(Object.values);


    FileUtils.exportPdf(fileName, head, body);
  }

  exportExcel() {
    const fileName = `Transações - ${new Date().toLocaleDateString()}`;
    FileUtils.exportExcel(fileName, this.convertTransacaoData());
  }

  exportCsv() {
    const fileName = `Transações - ${new Date().toLocaleDateString()}`;
    FileUtils.exportCSV(fileName, this.convertTransacaoData());
  }


  detail(transacao: TransacaoDto) {
    const { tipo_transacao } = transacao;

    switch (tipo_transacao) {


      case TipoTransacaoEnum.SERVICO:
        this.showModal(PrestacaoServicoDetailComponent, { id: transacao.prestacao_servico?.id || undefined }, '');
        break;

      default:
        this.toastService.presentToast({
          detalhe: `Detalhamento ainda não disponível para ${tipo_transacao}`,
          titulo: `Indisponível`,
          duracao: ToastEnum.shortDuration,
          gravidade: ToastPrimeSeverityEnum.ATENCAO
        });
    }
  }

  openColaborador(user_id: string) {
    this.showModal(FuncionarioProfileComponent, { user_id });
  }

  openCliente(user_id: string) {
    //this.showModal(ClienteProfileComponent, { user_id });
  }

  private convertTransacaoData() {
    const data = this.transacoes.data.map(p => {
      return {
        id: p.id,
        Condominio: p.condominio.nome,
        cliente: p.cliente?.nome || 'Não registrado',
        solicitante: p.solicitante.nome,
        valor_transacao: p.valor_transacao,
        tipo_financeiro: p.tipo_cash,
        tipo_transacao: p.tipo_transacao,
        id_associado: p.prestacao_servico?.id || 'Nenhum ID associado',
        data_criacao: new Date(p.created_at).toLocaleDateString(),
      }
    });

    return data;
  }

  private async showModal(
    component: ComponentRef,
    componentProps?: ComponentProps,
    cssClass = 'modal-size-100',
  ) {
    const modal = await this.modal.create({
      component,
      backdropDismiss: false,
      cssClass,
      componentProps,
    });

    modal.onDidDismiss()
      .then((data) => {
        const { data: hasUpdate, role } = data;

        if (hasUpdate) {
          /* this.loadTransacoes(this.currentPage);
           this.toastService.presentToast({
             detalhe: `Operação bem sucedida!`,
             titulo: `Sucesso!`,
             duracao: ToastEnum.mediumDuration,
             gravidade: ToastPrimeSeverityEnum.SUCESSO
           });*/
        }

      });

    return await modal.present();
  }

}
