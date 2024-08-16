

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';

import { SeeEnderecoComponent } from './see-endereco.component';

@NgModule({
  declarations: [SeeEnderecoComponent],
  imports: [
    CommonModule,
    IonicModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
  ],
  exports: [SeeEnderecoComponent],
})
export class SeeEnderecoModule { }
