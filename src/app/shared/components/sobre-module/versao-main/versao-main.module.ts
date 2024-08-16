import { VersaoMainComponent } from './versao-main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [VersaoMainComponent],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [VersaoMainComponent],
})
export class VersaoMainModule { }
