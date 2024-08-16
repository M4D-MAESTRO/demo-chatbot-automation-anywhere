
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { QuestionUserComponent } from './question-user.component';
import { BrazilianMasksPipeModule } from './../../../../pipes/brazilian-masks/brazilian-masks-pipe.module';

@NgModule({
  declarations: [QuestionUserComponent],
  imports: [
    CommonModule,
    IonicModule,
    DialogModule,
    ButtonModule,
    RippleModule,

    BrazilianMasksPipeModule
  ],
  exports: [QuestionUserComponent],
})
export class QuestionUserModule { }
