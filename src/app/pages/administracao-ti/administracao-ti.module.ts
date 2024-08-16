import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';

import { AdministracaoTiPageRoutingModule } from './administracao-ti-routing.module';

import { AdministracaoTiPage } from './administracao-ti.page';
import { DirectivesModule } from 'src/app/shared/directive/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ButtonModule,
    AccordionModule,
    RippleModule,
    CarouselModule,
    FontAwesomeModule,
    DirectivesModule,
    AdministracaoTiPageRoutingModule
  ],
  declarations: [AdministracaoTiPage]
})
export class AdministracaoTiPageModule { }
