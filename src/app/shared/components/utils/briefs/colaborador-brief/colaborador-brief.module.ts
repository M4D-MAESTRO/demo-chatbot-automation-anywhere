import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { ColaboradorBriefComponent } from './colaborador-brief.component';
import { DirectivesModule } from './../../../../directive/directives.module';

@NgModule({
  declarations: [ColaboradorBriefComponent],
  imports: [
    CommonModule,
    IonicModule,
    ButtonModule,
    RippleModule,
    DirectivesModule,
  ],
  exports: [ColaboradorBriefComponent],
})
export class ColaboradorBriefModule { }
