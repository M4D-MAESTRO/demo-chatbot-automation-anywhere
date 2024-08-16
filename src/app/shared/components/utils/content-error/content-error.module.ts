import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ContentErrorComponent } from './content-error.component';



@NgModule({
  declarations: [ContentErrorComponent],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [ContentErrorComponent],
})
export class ContentErrorModule { }
