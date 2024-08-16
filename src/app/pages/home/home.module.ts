import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { NgxEchartsModule } from 'ngx-echarts';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DirectivesModule } from '../../shared/directive/directives.module';
import { PipeModule } from './../../shared/pipes/pipe.module';
import { AdmRecursoModuleModule } from './../../shared/components/adm-recurso-module/adm-recurso-module.module';
import { AttentionSurfaceModule } from './../../shared/components/utils/attention-surface/attention-surface.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    MenuModule,
    PaginatorModule,
    ChartModule,
    FontAwesomeModule,
    SplitterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), 
    }),
    HomePageRoutingModule,
    DirectivesModule,
    PipeModule,
    AdmRecursoModuleModule,
    AttentionSurfaceModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
