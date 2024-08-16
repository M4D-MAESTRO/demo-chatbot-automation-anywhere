import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { saveAs } from 'file-saver';

import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Relatorios } from './../../../../../shared/constants/relatorio.constant';
import { ToastEnum } from './../../../../../shared/constants/toast.constant';
import { UserDto } from './../../../../../shared/interfaces/users/user.dto';
import { StorageService } from './../../../../../shared/services/auth/storage.service';
import { CondominioService } from './../../../../../shared/services/condominio/condominio.service';
import { ReportService } from './../../../../../shared/services/relatorio/report.service';
import { UserService } from './../../../../../shared/services/user/user.service';

@Component({
  selector: 'app-relatorio-main',
  templateUrl: './relatorio-main.component.html',
  styleUrls: ['./relatorio-main.component.scss'],
})
export class RelatorioMainComponent implements OnInit, OnDestroy {

  reportList = Relatorios;
  selectedReport;

  sortCondominios: SelectItem[] = [];
  operadores: UserDto[] = [];

  data: any = {};

  touchUI = false;

  reportName = 'Relatório.xlsx';

  private subscriptions = new Subscription();

  constructor(
    private readonly toastService: MessageService,
    private readonly reportService: ReportService,
    private readonly platform: Platform,
    private readonly condominioService: CondominioService,
    private readonly userService: UserService,
    private readonly storage: StorageService,
  ) {
  }

  ngOnInit() {
    if (this.platform.is('mobile')) {
      this.touchUI = true;
    }
    this.loadCondominios();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  async reportDownload() {


  }

  getDisabled() {
    if (this.selectedReport == 4) {
      return (this.data.date && this.data.user_id) ? false : true;
    }

    if (this.selectedReport == 5) {
      return (this.data.date && this.data.condominio_id) ? false : true;
    }
  }

  handleReportDropChange(eventValue) {
    this.reportName = 'Relatório.xlsx';
    this.operadores = [];
    this.data = {};
  }

  async handleBeforeDown() {
    if (this.selectedReport == 4) {
      const operador = this.operadores.find((o) => o.id == this.data.user_id);
      this.reportName = `Fechamento do dia ${this.data.date.toLocaleDateString('pt-BR')} - ${operador.nome}.xlsx`;
    }

    if (this.selectedReport == 5) {
      this.reportName = `Fechamento do dia ${this.data.date.toLocaleDateString('pt-BR')} - [Condominio].xlsx`;
      try {
        const { date, condominio_id } = this.data;
        //await this.tesourariaService.doCalculationByDateAndCondominio(date, condominio_id).toPromise();
      } catch (e) {
        throw e;
      }
    }
  }

  loadCondominios() {
    const sub = this.condominioService.list()
      .subscribe(page => {
        const arr = page.data.map((l) => {
          const { id, nome, codigo } = l;
          return {
            value: id,
            label: `${nome} - ${codigo}`
          }
        });

        this.sortCondominios = [{ value: undefined, label: 'Selecione' }, ...arr];
      });
    this.subscriptions.add(sub);
  }

  loadOperadores(condominio_id) {
    if (!condominio_id) {
      this.operadores = [];
      this.data.user_id = undefined;
      return;
    }
    const sub = this.userService.listUsers(condominio_id)
      .subscribe(loggedUsers => {
        this.operadores = loggedUsers.data;
      });

    this.subscriptions.add(sub);
  }


  private presentToast(
    severity: string,
    summary: string,
    detail: string,
    life: ToastEnum
  ) {
    this.toastService.clear();
    this.toastService.add({
      severity,
      summary,
      detail,
      life,
    });
  }

}
