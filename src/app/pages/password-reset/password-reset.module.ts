import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StepsModule } from 'primeng/steps';
import { MessageModule } from 'primeng/message';

import { DirectivesModule } from 'src/app/shared/directive/directives.module';
import { PasswordResetPageRoutingModule } from './password-reset-routing.module';

import { PasswordResetPage } from './password-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StepsModule,
    MessageModule,
    PasswordResetPageRoutingModule,
    DirectivesModule
  ],
  declarations: [PasswordResetPage]
})
export class PasswordResetPageModule {}
