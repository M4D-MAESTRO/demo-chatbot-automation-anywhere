import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministracaoGeralPageRoutingModule } from './administracao-geral-routing.module';

import { AdministracaoGeralPage } from './administracao-geral.page';
import { AdmGeralModule } from './../../shared/components/adm-geral-module/adm-geral.module';
import { DirectivesModule } from './../../shared/directive/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministracaoGeralPageRoutingModule,
    AdmGeralModule,
    DirectivesModule,

  ],
  declarations: [AdministracaoGeralPage]
})
export class AdministracaoGeralPageModule {}
