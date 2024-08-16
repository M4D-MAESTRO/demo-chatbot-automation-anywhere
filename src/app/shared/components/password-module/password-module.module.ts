import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ImageModule } from 'primeng/image';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'; 
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple'; 
import { DropdownModule } from 'primeng/dropdown'; 
import { FileUploadModule } from 'primeng/fileupload'; 
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';

import { DirectivesModule } from '../../../shared/directive/directives.module';
import { UserEditPasswordComponent } from './user-edit-password/user-edit-password.component';


@NgModule({
  declarations: [UserEditPasswordComponent, RecoveryPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DirectivesModule,
    ImageModule,
    PasswordModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    FileUploadModule,
    CheckboxModule,
    InputSwitchModule,
    MessageModule,
  ],
  exports: [UserEditPasswordComponent, RecoveryPasswordComponent],
})
export class PasswordModuleModule { }
