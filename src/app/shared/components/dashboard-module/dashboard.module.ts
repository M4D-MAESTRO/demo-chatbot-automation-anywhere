
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';

import { ContasClienteMainComponent } from './contas-cliente/contas-cliente-main/contas-cliente-main.component';
import { ContasColaboradorMainComponent } from './contas-colaborador/contas-colaborador-main/contas-colaborador-main.component';
import { TesourariaMainComponent } from './tesouraria/tesouraria-main/tesouraria-main.component';
import { TransacaoMainComponent } from './transacao/transacao-main/transacao-main.component';
import { DirectivesModule } from './../../directive/directives.module';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    ContasClienteMainComponent,
    ContasColaboradorMainComponent,
    TesourariaMainComponent,
    TransacaoMainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), 
    }),
    InputTextModule,
    BadgeModule,
    ChartModule,
    DividerModule,
    StyleClassModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    CalendarModule,
    DirectivesModule,
  ],
  exports: [
    ContasClienteMainComponent,
    ContasColaboradorMainComponent,
    TesourariaMainComponent,
    TransacaoMainComponent,
  ],
})
export class DashboardModule { }
