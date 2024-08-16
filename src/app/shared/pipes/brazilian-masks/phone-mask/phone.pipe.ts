import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }

    const areaCode = value.substring(0, 2);
    const firstPart = value.substring(2, 3);
    const secondPart = value.substring(3, 7);
    const thirdPart = value.substring(7, 11);

    if (value.length <= 2) {
      return `(${areaCode})`;
    } else if (value.length <= 3) {
      return `(${areaCode})${firstPart}`;
    } else if (value.length <= 7) {
      return `(${areaCode})${firstPart} ${secondPart}`;
    } else {
      return `(${areaCode})${firstPart} ${secondPart}-${thirdPart}`;
    }
  }
}
