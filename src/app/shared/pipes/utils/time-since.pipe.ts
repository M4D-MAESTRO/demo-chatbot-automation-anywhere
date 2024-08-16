import { Pipe, PipeTransform } from '@angular/core';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  transform(value: any): string {
    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);

    dayjs.updateLocale('en', {
      relativeTime: {
        future: "em %s",
        past: "%s atrás",
        s: 'alguns segundos ',
        m: "alguns minutos ",
        mm: "%d minutos",
        h: "a uma hora ",
        hh: "%d horas",
        d: "a um dia ",
        dd: "%d dias",
        M: "a mês ",
        MM: "%d meses",
        y: "a um ano ",
        yy: "%d anos"
      }
    });

    return dayjs(value).fromNow();
  }

}
