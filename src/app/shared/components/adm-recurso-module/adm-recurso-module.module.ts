import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { BlockUIModule } from 'primeng/blockui';
import { StepsModule } from 'primeng/steps';
import { PasswordModule } from 'primeng/password';
import { PaginatorModule } from 'primeng/paginator';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';

import { FuncionarioMainComponent } from './funcionarios/funcionario-main/funcionario-main.component';
import { FuncionarioDetailComponent } from './funcionarios/funcionario-detail/funcionario-detail.component';
import { FuncionarioCadastroComponent } from './funcionarios/funcionario-cadastro/funcionario-cadastro.component';
import { EnderecoModule } from '../endereco-module/endereco.module';
import { PatrimonioCadastroComponent } from './patrimonios/patrimonio-cadastro/patrimonio-cadastro.component';
import { PatrimonioDetailComponent } from './patrimonios/patrimonio-detail/patrimonio-detail.component';
import { PatrimonioMainComponent } from './patrimonios/patrimonio-main/patrimonio-main.component';
import { DirectivesModule } from '../../directive/directives.module';
import { NivelHierarquicoDialogModule } from '../utils/nivel-hierarquico-dialog/nivel-hierarquico-dialog.module';
import { FuncionarioProfileComponent } from './funcionarios/funcionario-profile/funcionario-profile.component';
import { DashboardModule } from '../dashboard-module/dashboard.module';
import { PasswordModuleModule } from '../password-module/password-module.module';
import { AuthorizationModuleModule } from '../authorization-module/authorization-module.module';
import { ColaboradorBriefModule } from '../utils/briefs/colaborador-brief/colaborador-brief.module';
import { BrazilianMasksPipeModule } from '../../pipes/brazilian-masks/brazilian-masks-pipe.module';


@NgModule({
  declarations: [
    FuncionarioMainComponent, FuncionarioDetailComponent, FuncionarioCadastroComponent, FuncionarioProfileComponent,
    PatrimonioCadastroComponent, PatrimonioDetailComponent, PatrimonioMainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DataViewModule,
    TieredMenuModule,
    InputTextModule,
    InputTextareaModule,
    ChartModule,
    CheckboxModule,
    RippleModule,
    StyleClassModule,
    DividerModule,
    AvatarModule,
    TableModule,
    MenuModule,
    AutoCompleteModule,
    NivelHierarquicoDialogModule,
    InputNumberModule,
    CheckboxModule,
    PaginatorModule,
    RadioButtonModule,
    BlockUIModule,
    PanelModule,
    ListboxModule,
    CalendarModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    RatingModule,
    ButtonModule,
    FileUploadModule,
    MessageModule,
    StepsModule,
    PasswordModule,
    InputMaskModule,
    InputSwitchModule,
    InputNumberModule,
    ConfirmDialogModule,
    EnderecoModule,
    DirectivesModule,
    AuthorizationModuleModule,
    PasswordModuleModule,
    DashboardModule,
    ColaboradorBriefModule,
    BrazilianMasksPipeModule,
  ],
  exports: [
    FuncionarioMainComponent, FuncionarioDetailComponent, FuncionarioCadastroComponent, FuncionarioProfileComponent,
    PatrimonioCadastroComponent, PatrimonioDetailComponent, PatrimonioMainComponent,
  ],
})
export class AdmRecursoModuleModule { }
