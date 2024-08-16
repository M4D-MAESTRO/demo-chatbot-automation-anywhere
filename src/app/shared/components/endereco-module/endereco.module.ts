import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { StepsModule } from 'primeng/steps';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';

import { EnderecoComponent } from './endereco/endereco.component';
import { DirectivesModule } from '../../directive/directives.module';
import { UpdateEnderecoComponent } from './update-endereco/update-endereco.component';



@NgModule({
  declarations: [EnderecoComponent, UpdateEnderecoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    InputMaskModule,
    DirectivesModule,
  ],
  exports: [EnderecoComponent, UpdateEnderecoComponent]
})
export class EnderecoModule { }
