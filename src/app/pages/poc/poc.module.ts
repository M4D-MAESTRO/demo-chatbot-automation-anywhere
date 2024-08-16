import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PocPageRoutingModule } from './poc-routing.module';

import { PocPage } from './poc.page';
import { GovBotMainModule } from './../../shared/components/chat-bots/gov-bot-main/gov-bot-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocPageRoutingModule,
    GovBotMainModule,
  ],
  declarations: [PocPage]
})
export class PocPageModule { }
