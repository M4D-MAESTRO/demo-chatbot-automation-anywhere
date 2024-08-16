import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncomendaCadastroModule } from './encomenda-cadastro/encomenda-cadastro.module';
import { EncomendaDetailModule } from './encomenda-detail/encomenda-detail.module';
import { EncomendaFinalizarModule } from './encomenda-finalizar/encomenda-finalizar.module';
import { EncomendaMainModule } from './encomenda-main/encomenda-main.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EncomendaCadastroModule,
    EncomendaDetailModule,
    EncomendaFinalizarModule,
    EncomendaMainModule,
  ],
  exports: [
    CommonModule,
    EncomendaCadastroModule,
    EncomendaDetailModule,
    EncomendaFinalizarModule,
    EncomendaMainModule,
  ],
})
export class EncomendaModuleModule { }
