import { Pipe, PipeTransform } from '@angular/core';
import { NotificacaoStatus } from 'src/app/shared/constants/notificacao.constant';

@Pipe({
  name: 'convertStatus'
})
export class ConvertStatusPipe implements PipeTransform {

  transform(status: any): string {
    switch (status) {
      case NotificacaoStatus.AVISO:
        return 'Aviso';

      case NotificacaoStatus.ERRO:
        return 'Erro';

      case NotificacaoStatus.INFO:
        return 'Informação';

      case NotificacaoStatus.SUCESSO:
        return 'Sucesso';

      default:
        return 'Informação';
    }

  }

}
