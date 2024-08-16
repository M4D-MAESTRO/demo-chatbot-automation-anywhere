import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpfPipe } from './../brazilian-masks/cpf.pipe';
import { CepPipe } from './../brazilian-masks/cep.pipe';
import { PhonePipe } from './phone-mask/phone.pipe';



@NgModule({
  declarations: [CpfPipe, CepPipe, PhonePipe],
  imports: [
    CommonModule
  ],
  exports: [CpfPipe, CepPipe, PhonePipe],
})
export class BrazilianMasksPipeModule { }
