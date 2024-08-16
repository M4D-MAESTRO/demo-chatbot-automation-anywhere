import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { DirectivesModule } from './../../../../directive/directives.module';
import { AreaBriefComponent } from './area-brief.component';


@NgModule({
  declarations: [AreaBriefComponent],
  imports: [
    CommonModule,
    CommonModule,
    IonicModule,
    ButtonModule,
    RippleModule,
    DirectivesModule,
  ],
  exports: [AreaBriefComponent],
})
export class AreaBriefModule { }
