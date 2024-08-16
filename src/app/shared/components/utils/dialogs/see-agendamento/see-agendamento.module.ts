

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
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';

import { SeeAgendamentoComponent } from './see-agendamento.component';
import { DirectivesModule } from './../../../../directive/directives.module';

@NgModule({
  declarations: [SeeAgendamentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    FontAwesomeModule,
    RippleModule,
    ChipModule,
    TagModule,
    MessageModule,
    PasswordModule,
    InputMaskModule,
    InputSwitchModule,
    InputNumberModule,
    ConfirmDialogModule,
    DirectivesModule,
  ],
  exports: [SeeAgendamentoComponent],
})
export class SeeAgendamentoModule { }
