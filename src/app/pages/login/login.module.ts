import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { DirectivesModule } from '../../shared/directive/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    InputTextModule,
    ButtonModule,
    CarouselModule,
    DividerModule,
    RippleModule,
    CheckboxModule,
    DirectivesModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
