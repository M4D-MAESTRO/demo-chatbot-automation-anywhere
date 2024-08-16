
import { SelectItem } from 'primeng/api';

export enum TipoAgendamento {
    PESSOAL = 'Compromisso Pessoal',
    EVENTO = 'Evento',
    SERVICO = 'Serviço',
}

export enum LocalAgendamento {
    LOCAL = 'Local',
    EXTERNO = 'Externo',
    REMOTO = 'Remoto',
}

export const TipoAgendamentoItens: SelectItem[] = [
    {
        label: TipoAgendamento.EVENTO,
        value: TipoAgendamento.EVENTO,
    },
    {
        label: TipoAgendamento.PESSOAL,
        value: TipoAgendamento.PESSOAL,
    },
    {
        label: TipoAgendamento.SERVICO,
        value: TipoAgendamento.SERVICO,
    },
]

export const LocalAgendamentoItens: SelectItem[] = [
    {
        label: "Local",
        value: LocalAgendamento.LOCAL,
    },
    {
        label: "Externo",
        value: LocalAgendamento.EXTERNO,
    },
    {
        label: "Remoto",
        value: LocalAgendamento.REMOTO,
    },
]
