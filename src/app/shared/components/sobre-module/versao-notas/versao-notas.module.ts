import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersaoNotasComponent } from './versao-notas.component';



@NgModule({
  declarations: [VersaoNotasComponent],
  imports: [
    CommonModule,
  ],
  exports: [VersaoNotasComponent],
})
export class VersaoNotasModule { }
