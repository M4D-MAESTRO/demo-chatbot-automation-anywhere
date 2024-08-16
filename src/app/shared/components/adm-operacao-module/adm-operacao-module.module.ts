
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { StepsModule } from 'primeng/steps';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';

import { DirectivesModule } from '../../directive/directives.module';
import { ServicoMainComponent } from './servicos/servico-main/servico-main.component';
import { ServicoDetailComponent } from './servicos/servico-detail/servico-detail.component';
import { ServicoCadastroComponent } from './servicos/servico-cadastro/servico-cadastro.component';
import { QuestionServicoModule } from '../utils/dialogs/question-servico/question-servico.module';
import { ImovelModuleModule } from './imoveis/imovel-module.module';
import { EncomendaModuleModule } from './encomendas/encomenda-module.module';
import { ChamadoModuleModule } from './chamados/chamado-module.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    TabViewModule,
    TableModule,
    FileUploadModule,
    InputTextModule,
    InputSwitchModule,
    CheckboxModule,
    InputTextareaModule,
    RadioButtonModule,
    ButtonModule,
    MessageModule,
    StepsModule,
    PasswordModule,
    InputMaskModule,
    InputSwitchModule,
    InputNumberModule,
    DialogModule,
    ConfirmDialogModule,
    DirectivesModule,
    QuestionServicoModule,

    ImovelModuleModule,
    EncomendaModuleModule,
    ChamadoModuleModule,
  ],
  exports: [
    ImovelModuleModule,
    EncomendaModuleModule,
    ChamadoModuleModule,
  ]
})
export class AdmOperacaoModuleModule { }
