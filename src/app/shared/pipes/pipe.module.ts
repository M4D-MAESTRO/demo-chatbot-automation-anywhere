import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyPipe } from './utils/empty.pipe';
import { ConvertStatusPipe } from './utils/notificacao/convert-status.pipe';
import { TimeSincePipe } from './utils/time-since.pipe';
import { LimitCharsPipe } from './utils/limit-chars.pipe';

@NgModule({
  declarations: [EmptyPipe, ConvertStatusPipe, TimeSincePipe, LimitCharsPipe],
  imports: [CommonModule,],
  exports: [EmptyPipe, ConvertStatusPipe, TimeSincePipe, LimitCharsPipe],
})
export class PipeModule { }
