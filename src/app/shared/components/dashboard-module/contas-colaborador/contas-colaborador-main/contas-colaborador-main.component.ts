import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuItem } from 'primeng/api';
import { EChartsOption } from 'echarts';
import { Calendar } from 'primeng/calendar';

import { ContasColaboradorService } from '../../../../../shared/services/adm-financeira/contas/contas-colaborador/contas-colaborador.service';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { PageOrder } from './../../../../constants/page.constant';
import { ContaColaboradorDto } from './../../../../interfaces/adm-financeiras/contas/conta-colaborador.dto';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { DateUtils } from '../../../../../shared/utils/DateUtils';
import { ExportTypeEnum } from '../../../../../shared/constants/export-type.constant';
import { DashboardReportTypeEnum } from '../../../../../shared/constants/dashboard.constant';
import { DashboardUtilsService } from './../../../../services/utils/dashboard-utils.service';
import { PreferencesService } from './../../../../services/preferences/preferences.service';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { CURRENT_DATE } from '../../../../../../config/api.config';

@Component({
  selector: 'app-contas-colaborador-main',
  templateUrl: './contas-colaborador-main.component.html',
  styleUrls: ['./contas-colaborador-main.component.scss'],
})
export class ContasColaboradorMainComponent implements OnInit, OnDestroy {

  @Input()
  user: UserDto;

  @Input()
  date: Date;
  short_date: string;
  formDate: Date;

  @ViewChild('calendar') calendar: Calendar;

  contas: PageableDto<ContaColaboradorDto>;
  month1Dash: EChartsOption;
  month2Dash: EChartsOption;

  dailyInDash: EChartsOption;
  dailyOutDash: EChartsOption;

  pieChartOptions = {
    responsive: false,
    maintainAspectRatio: false
  }

  tabOpcoes: number = 0;
  isLoaded = false;

  items: MenuItem[];

  selectedDashReport: EChartsOption;

  private subscriptions = new Subscription();

  constructor(
    private readonly contaColaboradorService: ContasColaboradorService,
    private readonly toastService: ToastMessageService,
    private readonly preferencesService: PreferencesService,
    private readonly dashboardUtilsService: DashboardUtilsService,
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: (event) => {
          this.selectedDashReport.exportPDF();
          this.calendarEnable();
        },
      },
      {
        label: 'CSV',
        icon: 'pi pi-file-o',
        command: (event) => {
          this.selectedDashReport.exportCSV();
          this.calendarEnable();
        },
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        command: (event) => {
          this.selectedDashReport.exportXLSX();
          this.calendarEnable();
        },
      }
    ];

    if (!this.date) {
      this.date = new Date(CURRENT_DATE);
    }

    this.formDate = this.date;
    this.short_date = DateUtils.getShortDate(this.date);
    this.loadConta();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadConta(page = 1) {
    const { id: colaborador_id } = this.user;
    const sub = this.contaColaboradorService.list(
      { selected_month: this.date, colaborador_id },
      { order: PageOrder.DESC, page, take: 35 }
    )
      .subscribe(response => {
        this.contas = response;
        const [month1Dash, month2Dash] = this.dashboardUtilsService.mountColaboradorMonthDash(this.contas.data, this.date);
        this.month1Dash = month1Dash;
        this.month2Dash = month2Dash;
        this.mountDashDaily();
        this.isLoaded = true;
      });
    this.subscriptions.add(sub);
  }

  dateChange() {
    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth();

    const newYear = this.formDate.getFullYear();
    const newMonth = this.formDate.getMonth();

    this.date = this.formDate;
    this.short_date = DateUtils.getShortDate(this.date);
    if (currentYear == newYear && currentMonth == newMonth) {
      this.mountDashDaily();
    } else {
      this.loadConta();
    }
  }

  exportReport(exportType: ExportTypeEnum) {
    //Melhorar essa porra
    this.month2Dash.exportXLSX();
    //this.dashboardUtilsService.exportReport(exportType, this.selectedDashReport, this.date, this.contas.data);
  }

  getTheme() {
    const theme = this.preferencesService.getThemePreference();
    const surfaceBackground = this.preferencesService.surfaceBackground;

    if (this.month1Dash) {
      this.month1Dash.backgroundColor = surfaceBackground;
    }

    if (this.month2Dash) {
      this.month2Dash.backgroundColor = surfaceBackground;
    }

    if (this.dailyInDash) {
      this.dailyInDash.backgroundColor = surfaceBackground;
    }

    if (this.dailyOutDash) {
      this.dailyOutDash.backgroundColor = surfaceBackground;
    }

    return theme == 'dark' ? theme : undefined;
  }


  //#region CALENDAR-FIX
  calendarDisable() {
    this.calendar.hideOverlay();
    this.calendar.disabled = true;
  }
  calendarEnable() {
    this.calendar.disabled = false;
    this.calendar.hideOverlay();
  }
  //#endregion

  private mountDashDaily() {
    const [dailyInDash, dailyOutDash] =
      this.dashboardUtilsService.mountColaboradorDailyDash(this.contas.data, this.short_date);

    this.dailyInDash = dailyInDash;
    this.dailyOutDash = dailyOutDash;

  }

}
