import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';

import { RelatorioMainComponent } from './relatorios/relatorio-main/relatorio-main.component';
import { DirectivesModule } from '../../directive/directives.module';
import { AdmRecursoModuleModule } from '../adm-recurso-module/adm-recurso-module.module';
import { TransacoesDetailComponent } from './transacoes/transacoes-detail/transacoes-detail.component';
import { TransacoesMainComponent } from './transacoes/transacoes-main/transacoes-main.component';
import { PrestacaoServicoDetailComponent } from './prestacoes-servico/prestacao-servico-detail/prestacao-servico-detail.component';
import { PrestacaoServicoMainComponent } from './prestacoes-servico/prestacao-servico-main/prestacao-servico-main.component';
import { AttentionSurfaceModule } from '../utils/attention-surface/attention-surface.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';



@NgModule({
  declarations: [
    RelatorioMainComponent,
    TransacoesDetailComponent, TransacoesMainComponent,
    PrestacaoServicoMainComponent, PrestacaoServicoDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FontAwesomeModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    SliderModule,
    MessageModule,
    InputMaskModule,
    InputNumberModule,
    InputMaskModule,
    CalendarModule,
    InputNumberModule,
    RadioButtonModule,
    StepsModule,
    PasswordModule,
    InputSwitchModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextareaModule,
    CheckboxModule,
    CalendarModule,
    AdmRecursoModuleModule,
    DirectivesModule,
    AttentionSurfaceModule,
    PagamentosModule,
  ],
  exports: [
    RelatorioMainComponent,
    TransacoesDetailComponent, TransacoesMainComponent,
    PrestacaoServicoMainComponent, PrestacaoServicoDetailComponent,
  ]
})
export class AdmFincanceiraModule { }
