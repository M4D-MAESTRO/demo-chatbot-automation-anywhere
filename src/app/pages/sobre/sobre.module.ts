import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobrePageRoutingModule } from './sobre-routing.module';

import { SobrePage } from './sobre.page';
import { DirectivesModule } from './../../shared/directive/directives.module';
import { SobreModuleModule } from './../../shared/components/sobre-module/sobre-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobrePageRoutingModule,
    SobreModuleModule,
    DirectivesModule,
  ],
  declarations: [SobrePage]
})
export class SobrePageModule { }
