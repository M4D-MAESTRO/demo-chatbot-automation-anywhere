import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

import { DirectivesModule } from '../../../../../shared/directive/directives.module';
import { BrazilianMasksPipeModule } from './../../../../pipes/brazilian-masks/brazilian-masks-pipe.module';

import { ChamadoMainComponent } from './chamado-main.component';
import { AttentionSurfaceModule } from '../../../utils/attention-surface/attention-surface.module';

@NgModule({
  declarations: [ChamadoMainComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,

    DataViewModule,
    PanelModule,
    InputTextModule,
    RatingModule,
    ButtonModule,
    MenuModule,
    MessageModule,
    InputSwitchModule,
    TableModule,
    DialogModule,
    RippleModule,
    StyleClassModule,
    DividerModule,
    DropdownModule,

    DirectivesModule,
    BrazilianMasksPipeModule,
    AttentionSurfaceModule,
  ],
  exports: [ChamadoMainComponent,]
})
export class ChamadoMainModule { }
