
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { QuestionStatusServicoComponent } from './question-status-servico.component';

@NgModule({
  declarations: [QuestionStatusServicoComponent],
  imports: [
    CommonModule,
    IonicModule,
    DialogModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [QuestionStatusServicoComponent],
})
export class QuestionStatusServicoModule { }
