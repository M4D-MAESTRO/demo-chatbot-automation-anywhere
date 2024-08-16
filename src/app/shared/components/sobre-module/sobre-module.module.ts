import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersaoMainModule } from './versao-main/versao-main.module';
import { VersaoNotasComponent } from './versao-notas/versao-notas.component';
import { VersaoNotasModule } from './versao-notas/versao-notas.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VersaoMainModule,
    VersaoNotasModule,
  ],
  exports: [
    VersaoMainModule,
    VersaoNotasModule,
  ]
})
export class SobreModuleModule { }
