import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCharsPipe'
})
export class LimitCharsPipe implements PipeTransform {

  transform(value: unknown, cutPoint: number): unknown {
    
    if (typeof value == 'string' && value.trim().length >= 1) {
      if(cutPoint && cutPoint <= 0){
        cutPoint = value.trim().length;
        return value.trim().substring(0);
      }
      return value.trim().substring(0, cutPoint) + '...';
    }
    return value;
  }

}
