
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';

import { DirectivesModule } from '../../../../../shared/directive/directives.module';
import { BrazilianMasksPipeModule } from './../../../../pipes/brazilian-masks/brazilian-masks-pipe.module';
import { ChamadoCadastroComponent } from './chamado-cadastro.component';
import { AttentionSurfaceModule } from '../../../utils/attention-surface/attention-surface.module';



@NgModule({
  declarations: [ChamadoCadastroComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,

    PanelModule,
    InputTextModule,
    RatingModule,
    ButtonModule,
    DropdownModule,
    TabViewModule,
    InputTextareaModule,
    MessageModule,
    PasswordModule,
    InputMaskModule,
    InputSwitchModule,
    ListboxModule,
    RadioButtonModule,
    CheckboxModule,
    DialogModule,
    InputNumberModule,
    RippleModule,
    FileUploadModule,
    StyleClassModule,
    DividerModule,
    ImageModule,

    AttentionSurfaceModule,
    DirectivesModule,
    BrazilianMasksPipeModule,
  ],
  exports: [ChamadoCadastroComponent]
})
export class ChamadoCadastroModule { }
