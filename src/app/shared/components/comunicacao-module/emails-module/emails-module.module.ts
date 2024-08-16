import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillModule } from 'ngx-quill'
import { MessageModule } from 'primeng/message';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';

import { EmailSendComponent } from './email-send/email-send.component';
import { EmailProgramacaoCreateComponent } from './email-programacao-create/email-programacao-create.component';
import { EmailProgramacaoListComponent } from './email-programacao-list/email-programacao-list.component';



@NgModule({
  declarations: [
    EmailSendComponent, EmailProgramacaoCreateComponent, EmailProgramacaoListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChipsModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    QuillModule.forRoot({
      modules: {
        toolbar: {
          container: [[{ color: '#ffffff', background: '#ffffff' }]]
        }
      }
    }),
  ],
  exports: [
    EmailSendComponent, EmailProgramacaoCreateComponent, EmailProgramacaoListComponent,
  ],
})
export class EmailsModuleModule { }
