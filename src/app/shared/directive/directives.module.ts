import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollThemeDirective } from './scroll-theme/scroll-theme.directive';



@NgModule({
  declarations: [ScrollThemeDirective],
  imports: [
    CommonModule,
  ],
  exports: [ScrollThemeDirective],
})
export class DirectivesModule { }
