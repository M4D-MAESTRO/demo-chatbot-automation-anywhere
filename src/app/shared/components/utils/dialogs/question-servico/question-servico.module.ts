import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { QuestionServicoComponent } from './question-servico.component';

@NgModule({
  declarations: [QuestionServicoComponent],
  imports: [
    CommonModule,
    IonicModule,
    DialogModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [QuestionServicoComponent],
})
export class QuestionServicoModule { }
