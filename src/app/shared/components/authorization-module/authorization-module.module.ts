import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';

import { PipeModule } from './../../pipes/pipe.module';
import { DirectivesModule } from '../../directive/directives.module';
import { AuthorizationMainComponent } from './authorization-main/authorization-main.component';
import { AuthorizationSelectionComponent } from './authorization-selection/authorization-selection.component';
import { AttentionSurfaceModule } from '../utils/attention-surface/attention-surface.module';

@NgModule({
  declarations: [AuthorizationMainComponent, AuthorizationSelectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,

    ButtonModule,
    RippleModule,
    InputTextModule,
    InputSwitchModule,
    DialogModule,
    DropdownModule,
    DividerModule,
    StyleClassModule,
    MenuModule,
    ConfirmDialogModule,
    PanelModule,
    MessageModule,
    AvatarModule,
    TableModule,
    CheckboxModule,
    InputTextareaModule,

    PipeModule,
    DirectivesModule,
    AttentionSurfaceModule,
  ],
  exports: [AuthorizationMainComponent, AuthorizationSelectionComponent],
})
export class AuthorizationModuleModule { }
