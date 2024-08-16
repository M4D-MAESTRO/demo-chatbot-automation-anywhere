import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdministracaoRecursoPageRoutingModule } from './administracao-recurso-routing.module';

import { AdministracaoRecursoPage } from './administracao-recurso.page';
import { DirectivesModule } from './../../shared/directive/directives.module';
import { AdmRecursoModuleModule } from './../../shared/components/adm-recurso-module/adm-recurso-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    AdministracaoRecursoPageRoutingModule,
    DirectivesModule,
    AdmRecursoModuleModule,
  ],
  declarations: [AdministracaoRecursoPage]
})
export class AdministracaoRecursoPageModule {}
