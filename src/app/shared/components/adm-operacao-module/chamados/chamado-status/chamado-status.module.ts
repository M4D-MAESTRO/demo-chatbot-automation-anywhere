
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChamadoStatusComponent } from './chamado-status.component';

import { AttentionSurfaceModule } from '../../../utils/attention-surface/attention-surface.module';

@NgModule({
  declarations: [ChamadoStatusComponent,],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,

    PanelModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MessageModule,
    ListboxModule,
    DialogModule,
    RippleModule,
    StyleClassModule,
    DividerModule,

    AttentionSurfaceModule,
  ],
  exports: [ChamadoStatusComponent,]
})
export class ChamadoStatusModule { }
