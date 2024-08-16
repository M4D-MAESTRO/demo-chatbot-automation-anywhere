import { NotificacaoTipoEnum } from "../constants/notificacao.constant";


export class NotificacaoUtils {
    static getIconByTipo(tipo: string) {
        switch (tipo) {
            case NotificacaoTipoEnum.CARGA:
                return 'pi pi-cloud-upload';

            case NotificacaoTipoEnum.MENSAGEM_COMUM:
                return 'pi pi-envelope';

            case NotificacaoTipoEnum.MENSAGEM_PRIORITARIA:
                return 'pi pi-info-circle';

            case NotificacaoTipoEnum.MENSAGEM_PROGRAMADA:
                return 'pi pi-directions';

            default:
                return 'pi pi-comment';
        }
    }
} 
