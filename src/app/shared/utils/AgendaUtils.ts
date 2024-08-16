import { TipoAgendamento } from "../constants/agendamento.constant";
import { AgendaDto } from "../interfaces/agendas/agenda.dto";
import { PreferencesService } from '../services/preferences/preferences.service';

export class AgendaUtils {


    static convertCompromissoToEvent(compromisso: AgendaDto) {
        const { data_inicio, data_fim, hora_fim, hora_inicio, tipo } = compromisso;

        const start = new Date(`${data_inicio} ${hora_inicio}`);
        const end = new Date(`${data_fim} ${hora_fim}`);

        let backgroundColor: string;
        switch (tipo) {
            case TipoAgendamento.EVENTO:
                backgroundColor = '#2e2e85';
                break;

            case TipoAgendamento.SERVICO:
                backgroundColor = '#2e854b';
                break;

            case TipoAgendamento.PESSOAL:
                backgroundColor = '#856c2e';
                break;

            default:
                backgroundColor = '#852e3d';
        }

        return {
            start,
            end,
            backgroundColor,
        }
    }


}