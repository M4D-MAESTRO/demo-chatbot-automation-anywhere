import { NivelHierarquicoDialogComponent } from './nivel-hierarquico-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { OrganizationChartModule } from 'primeng/organizationchart';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [NivelHierarquicoDialogComponent],
  imports: [
    CommonModule,
    IonicModule,
    OrganizationChartModule,
    ButtonModule,
  ],
  exports: [NivelHierarquicoDialogComponent],
})
export class NivelHierarquicoDialogModule { }
