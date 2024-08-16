

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';

import { DirectivesModule } from './../../../directive/directives.module';
import { GenericDialogComponent } from './generic-dialog.component';



@NgModule({
  declarations: [GenericDialogComponent],
  imports: [
    CommonModule,
    IonicModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    DynamicDialogModule,
    DirectivesModule
  ],
  exports: [GenericDialogComponent]
})
export class GenericDialogModule { }
