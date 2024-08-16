import { OpcoesAcrescimoDescontoEnum, OpcoesTipoEnum } from "../constants/descontos.constant";
import { CreatePrestacaoServicoDto } from "../interfaces/servicos/prestacao-servico.dto";

export class ServicoUtils {
    static setAcrescimoDesconto(
        opcao: OpcoesAcrescimoDescontoEnum,
        tipo: OpcoesTipoEnum,
        servico: CreatePrestacaoServicoDto,
        acrescimo_desconto: number
    ) {
        if (opcao == OpcoesAcrescimoDescontoEnum.NAO) {
            delete servico.descricao;
            return servico;
        }

        if (opcao == OpcoesAcrescimoDescontoEnum.ACRESCIMO) {
            if (tipo == OpcoesTipoEnum.FIXO) {
                servico.valor_acrescimo = acrescimo_desconto;
            } else {
                servico.percentual_acrescimo = acrescimo_desconto;
            }
        } else {
            if (tipo == OpcoesTipoEnum.FIXO) {
                servico.valor_desconto = acrescimo_desconto;
            } else {
                servico.percentual_desconto = acrescimo_desconto;
            }
        }

        return servico;
    }
}