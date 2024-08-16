import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';

import { DirectivesModule } from '../../../../../shared/directive/directives.module';
import { BrazilianMasksPipeModule } from './../../../../pipes/brazilian-masks/brazilian-masks-pipe.module';

import { AttentionSurfaceModule } from '../../../utils/attention-surface/attention-surface.module';
import { ChamadoDetailComponent } from './chamado-detail.component';

@NgModule({
  declarations: [ChamadoDetailComponent,],
  imports: [
    CommonModule,
    IonicModule,

    ButtonModule,
    RippleModule,
    ChipModule,
    TagModule,
    ImageModule,
    PanelModule,

    DirectivesModule,
    BrazilianMasksPipeModule,

    AttentionSurfaceModule,
  ],
  exports: [ChamadoDetailComponent,]
})
export class ChamadoDetailModule { }
