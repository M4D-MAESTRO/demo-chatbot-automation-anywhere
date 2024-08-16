import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadoStatusModule } from './chamado-status/chamado-status.module';
import { ChamadoMainModule } from './chamado-main/chamado-main.module';
import { ChamadoCadastroModule } from './chamado-cadastro/chamado-cadastro.module';
import { ChamadoDetailModule } from './chamado-detail/chamado-detail.module';
import { ChamadoUpdateModule } from './chamado-update/chamado-update.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChamadoStatusModule,
    ChamadoMainModule,
    ChamadoCadastroModule,
    ChamadoDetailModule,
    ChamadoUpdateModule,
  ],
  exports: [
    ChamadoStatusModule,
    ChamadoMainModule,
    ChamadoCadastroModule,
    ChamadoDetailModule,
    ChamadoUpdateModule,
  ]
})
export class ChamadoModuleModule { }
