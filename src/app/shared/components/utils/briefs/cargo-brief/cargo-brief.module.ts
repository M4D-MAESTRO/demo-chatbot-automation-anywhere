import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { DirectivesModule } from './../../../../directive/directives.module';
import { CargoBriefComponent } from './cargo-brief.component';

@NgModule({
  declarations: [CargoBriefComponent],
  imports: [
    CommonModule,
    IonicModule,
    ButtonModule,
    RippleModule,
    DirectivesModule,
  ],
  exports: [CargoBriefComponent],
})
export class CargoBriefModule { }
