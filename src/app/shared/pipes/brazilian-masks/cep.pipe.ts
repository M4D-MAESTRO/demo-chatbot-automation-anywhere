import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMask'
})
export class CepPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
