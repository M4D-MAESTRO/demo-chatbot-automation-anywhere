import { OpcoesAcrescimoDescontoEnum, OpcoesTipoEnum } from "../constants/descontos.constant";
import { CreatePedidoDto, PedidoDto } from "../interfaces/pedidos/pedido.dto";

export class PedidoUtils {
    static setAcrescimoDesconto(opcao: OpcoesAcrescimoDescontoEnum, tipo: OpcoesTipoEnum, pedido: CreatePedidoDto, acrescimo_desconto: number) {
        if (opcao == OpcoesAcrescimoDescontoEnum.NAO) {
            delete pedido.descricao;
            return pedido;
        }

        if (opcao == OpcoesAcrescimoDescontoEnum.ACRESCIMO) {
            if (tipo == OpcoesTipoEnum.FIXO) {
                pedido.valor_acrescimo = acrescimo_desconto;
            } else {
                pedido.percentual_acrescimo = acrescimo_desconto;
            }
        } else {
            if (tipo == OpcoesTipoEnum.FIXO) {
                pedido.valor_desconto = acrescimo_desconto;
            } else {
                pedido.percentual_desconto = acrescimo_desconto;
            }
        }

        return pedido;
    }
}