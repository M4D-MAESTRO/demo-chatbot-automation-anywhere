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

import { DirectivesModule } from '../../directive/directives.module';
import { CartaoMainComponent } from './cartoes/cartao-main/cartao-main.component';
import { CartaoCadastroComponent } from './cartoes/cartao-cadastro/cartao-cadastro.component';
import { CartaoDetailComponent } from './cartoes/cartao-detail/cartao-detail.component';
import { DespesaMainComponent } from './despesas/despesa-main/despesa-main.component';
import { DespesaDetailComponent } from './despesas/despesa-detail/despesa-detail.component';
import { DespesaCadastroComponent } from './despesas/despesa-cadastro/despesa-cadastro.component';
import { EnderecoModule } from '../endereco-module/endereco.module';
import { LojaDetailComponent } from './lojas/loja-detail/loja-detail.component';
import { LojaCadastroComponent } from './lojas/loja-cadastro/loja-cadastro.component';
import { LojaMainComponent } from './lojas/loja-main/loja-main.component';
import { ContentErrorModule } from '../utils/content-error/content-error.module';

@NgModule({
  declarations: [
    LojaCadastroComponent, LojaDetailComponent, LojaMainComponent,
    CartaoMainComponent, CartaoCadastroComponent, CartaoDetailComponent,
    DespesaMainComponent, DespesaDetailComponent, DespesaCadastroComponent,
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
    EnderecoModule,
    DirectivesModule,
    ContentErrorModule,
  ],
  exports: [
    LojaCadastroComponent, LojaDetailComponent, LojaMainComponent,
    CartaoMainComponent, CartaoCadastroComponent, CartaoDetailComponent,
    DespesaMainComponent, DespesaDetailComponent, DespesaCadastroComponent,
  ]
})
export class AdmGeralModule { }
