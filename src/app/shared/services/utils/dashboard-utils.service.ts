import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { format } from 'date-fns';

import { TesourariaEmpresaDto } from './../../interfaces/adm-financeiras/tesourarias-empresa/tesourarias-empresa.dto';
import { ContaColaboradorDto } from './../../interfaces/adm-financeiras/contas/conta-colaborador.dto';
import { DashboardReportTypeEnum } from "../../constants/dashboard.constant";
import { ExportTypeEnum } from "../../constants/export-type.constant";
import { ToastEnum, ToastPrimeSeverityEnum } from "../../constants/toast.constant";
import { ToastMessageService } from "../../services/toast/toast-message.service";
import { FileUtils } from "./../../../shared/utils/FileUtils";
import { DateUtils } from './../../../shared/utils/DateUtils';
import { SimpleDashboardDto } from '../../interfaces/adm-financeiras/dashboards/dashboard.dto';
import { TesourariaDto } from '../../interfaces/adm-financeiras/tesourarias/tesouraria.dto';
import { CURRENT_DATE } from '../../../../config/api.config';
import { PreferencesService } from '../../services/preferences/preferences.service';
import { LabelUtils } from '../../utils/LabelUtils';
import { ContaClienteDto } from '../../interfaces/adm-financeiras/contas/conta-cliente.dto';
import { DashboardClienteEntradaDto } from '../../interfaces/adm-financeiras/dashboard-clientes/dashboard-cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardUtilsService {

  constructor(
    private readonly toastService: ToastMessageService,
    private readonly preferencesService: PreferencesService,
  ) { }

  exportReport(exportType: ExportTypeEnum, dashboardType: DashboardReportTypeEnum, date: Date, contas: ContaColaboradorDto[]) {

    let head;
    let body;
    let fileName;

    switch (dashboardType) {
      case DashboardReportTypeEnum.MES_MOV_1:
        fileName = `Movimentação da primeira quinzena - ${new Date(date).toLocaleDateString('pt-BR')}`;
        body = contas.map(c => {
          return {
            "Data": c.short_date,
            "Total de Entrada": c.cash_in_valor,
            "Total de saida": c.cash_out_valor,
            "Total em caixa": c.cash_total_valor
          }
        })
          .filter(c => {
            if (Number(c.Data.split('/')[0]) < 15) {
              return c;
            }
          })
          .sort((a, b) => {
            return a.Data < b.Data ? -1 : a.Data > b.Data ? 1 : 0;
          });
        break;

      case DashboardReportTypeEnum.MES_MOV_2:
        fileName = `Movimentação da segunda quinzena - ${new Date(date).toLocaleDateString('pt-BR')}`;
        body = contas.map(c => {
          return {
            "Data": c.short_date,
            "Total de Entrada": c.cash_in_valor,
            "Total de saida": c.cash_out_valor,
            "Total em caixa": c.cash_total_valor
          }
        })
          .filter(c => {
            if (Number(c.Data.split('/')[0]) >= 15) {
              return c;
            }
          })
          .sort((a, b) => {
            return a.Data < b.Data ? -1 : a.Data > b.Data ? 1 : 0;
          });

        break;

      case DashboardReportTypeEnum.DIA_ENTRADA://Acertar para sair apenas as entradas
        fileName = `Movimentação de entrada - ${new Date(date).toLocaleDateString('pt-BR')}`;

        const short_date1 = DateUtils.getShortDate(date);
        const contaIndex1 = contas.findIndex(c => c.short_date == short_date1);
        if (contaIndex1 != -1) {
          const { assinatura_venda_valor, produto_venda_valor, servico_prestado_valor, devolucao_in_valor }
            = contas[contaIndex1]
          body = [{
            'Venda de assinaturas': assinatura_venda_valor,
            'Venda de produtos': produto_venda_valor,
            'Prestação de serviços': servico_prestado_valor,
            'Devoluções recebidas': devolucao_in_valor
          }]
        }
        break;

      case DashboardReportTypeEnum.DIA_SAIDA://Acertar para sair apenas as saidas
        fileName = `Movimentação de saída - ${new Date(date).toLocaleDateString('pt-BR')}`;
        const short_date2 = DateUtils.getShortDate(date);
        const contaIndex2 = contas.findIndex(c => c.short_date == short_date2);
        if (contaIndex2 != -1) {
          const { assinatura_venda_valor, produto_venda_valor, servico_prestado_valor, devolucao_in_valor }
            = contas[contaIndex2]
          body = [{
            'Venda de assinaturas': assinatura_venda_valor,
            'Venda de produtos': produto_venda_valor,
            'Prestação de serviços': servico_prestado_valor,
            'Devoluções recebidas': devolucao_in_valor
          }]
        }
        break;

      default:
        this.toastService.presentToast({
          titulo: `Opção de dashboard!`,
          detalhe: `Opção ${dashboardType} inválida`,
          duracao: ToastEnum.shortDuration,
          gravidade: ToastPrimeSeverityEnum.ATENCAO,
        });

        return;
    }

    switch (exportType) {
      case ExportTypeEnum.PDF:
        head = Object.keys(body[0]);
        body = body.map(c => Object.values(c));
        FileUtils.exportPdf(fileName, head, body);
        break;

      case ExportTypeEnum.CSV:
        FileUtils.exportCSV(fileName, body);
        break;

      case ExportTypeEnum.EXCEL:
        FileUtils.exportExcel(fileName, body);
        break;

      default:
        this.toastService.presentToast({
          titulo: `Opção de exportação!`,
          detalhe: `Opção ${exportType} inválida`,
          duracao: ToastEnum.shortDuration,
          gravidade: ToastPrimeSeverityEnum.ATENCAO,
        });
    }
  }

  convertToSimpleDash(dto: ContaColaboradorDto | TesourariaDto | TesourariaEmpresaDto): SimpleDashboardDto {
    const {
      assinatura_venda_valor,
      assinatura_venda_quantidade,
      produto_venda_valor,
      produto_venda_quantidade,
      servico_prestado_valor,
      servico_prestado_quantidade,
      cash_in_valor,
      cash_in_quantidade,
      cash_out_valor,
      cash_out_quantidade,
      cash_total_valor,
    } = dto;

    return {
      assinatura_venda_valor,
      assinatura_venda_quantidade,
      produto_venda_valor,
      produto_venda_quantidade,
      servico_prestado_valor,
      servico_prestado_quantidade,
      cash_in_valor,
      cash_in_quantidade,
      cash_out_valor,
      cash_out_quantidade,
      cash_total_valor,
    }
  }

  convertToInOutSimpleDash(dto: ContaColaboradorDto | TesourariaDto | TesourariaEmpresaDto): EChartsOption {
    const {
      cash_in_valor,
      cash_out_valor,
      cash_total_valor,
    } = dto;

    const subtext =
      'colaborador' in dto ? `Do colaborador ${dto.colaborador}` :
        'loja' in dto ? `Da loja ${dto.loja}` :
          `Da empresa`;


    const chart: EChartsOption = {
      title: {
        left: '50%',
        text: 'Entrada/Saída de receita',
        subtext,
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        align: 'auto',
        bottom: 10,
        data: ['Entrada financeira', 'Saída financeira', 'Total']
      },
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: [30, 110],
          roseType: 'radius',
          data: [
            { value: cash_in_valor, name: 'Entrada financeira', },
            { value: cash_out_valor, name: 'Saída financeira', },
            { value: cash_total_valor, name: 'Total', },
          ],
        }
      ],
    };

    return chart;
  }

  mountColaboradorMonthDash(contas: ContaColaboradorDto[], date = new Date(CURRENT_DATE)): EChartsOption[] {
    const labels = LabelUtils.generateMonthLabel(date.getMonth());

    const entradaValor = [];
    const entradaQuantidade = [];

    const saidaValor = [];
    const saidaQuantidade = [];

    const total = [];
    const month1FileName = `Movimentação da primeira quinzena - ${new Date(date).toLocaleDateString('pt-BR')}`;
    const month2FileName = `Movimentação da segunda quinzena - ${new Date(date).toLocaleDateString('pt-BR')}`;
    const body = [];

    labels.forEach((l, loopIndex) => {
      const contaIndex = contas.findIndex(c => {
        return c.short_date == l;
      });

      if (contaIndex != -1) {
        const {
          cash_in_valor, cash_in_quantidade,
          cash_out_valor, cash_out_quantidade,
          cash_total_valor
        } = contas[contaIndex];

        entradaValor.push(cash_in_valor);
        entradaQuantidade.push(cash_in_quantidade);

        saidaValor.push(cash_out_valor);
        saidaQuantidade.push(cash_out_quantidade);

        total.push(cash_total_valor);
      } else {
        entradaValor.push(0);
        entradaQuantidade.push(0);

        saidaValor.push(0);
        saidaQuantidade.push(0);

        total.push(0);
      }
      body.push({
        "Data": l,
        "Total de Entrada": entradaValor[loopIndex],
        "Total de saida": saidaValor[loopIndex],
        "Total em caixa": total[loopIndex],
      });
    });

    let month1Body = body.slice(0, 15);
    let month2Body = body.slice(15);

    const month1Dash: EChartsOption = {
      legend: {
        data: ['Entrada (R$)', 'Saída (R$)', 'Total (R$)'],
        align: 'left',
      },
      tooltip: {

      },
      yAxis: {},
      xAxis: {
        data: labels.slice(0, 15),
        silent: false,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Entrada (R$)',
          type: 'bar',
          data: entradaValor.slice(0, 15),
          animationDelay: (idx) => idx * 10,
          color: '#39e360',
        },
        {
          name: 'Saída (R$)',
          type: 'bar',
          data: saidaValor.slice(0, 15),
          animationDelay: (idx) => idx * 10 + 100,
          color: '#dae339',
        },
        {
          name: 'Total (R$)',
          type: 'bar',
          data: total.slice(0, 15),
          animationDelay: (idx) => idx * 10 + 100,
          color: '#a2a38b',
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
      exportPDF: () => {
        const month1Head = Object.keys(month1Body[0]);
        const tempBody = month1Body.map(c => Object.values(c)) as any;
        FileUtils.exportPdf(month1FileName, month1Head, tempBody as any);
      },
      exportXLSX: () => {
        FileUtils.exportExcel(month1FileName, month1Body);
      },
      exportCSV: () => {
        FileUtils.exportCSV(month1FileName, month1Body);
      },
    };

    const month2Dash: EChartsOption = {
      legend: {
        data: ['Entrada (R$)', 'Saída (R$)', 'Total (R$)'],
        align: 'left',
      },
      calculable: true,
      tooltip: {},
      yAxis: {},
      xAxis: {
        data: labels.slice(15),
        silent: false,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Entrada (R$)',
          type: 'bar',
          data: entradaValor.slice(15),
          animationDelay: (idx) => idx * 10,
          color: '#39e360',
        },
        {
          name: 'Saída (R$)',
          type: 'bar',
          data: saidaValor.slice(15),
          animationDelay: (idx) => idx * 10 + 100,
          color: '#dae339',
        },
        {
          name: 'Total (R$)',
          type: 'bar',
          data: total.slice(15),
          animationDelay: (idx) => idx * 10 + 100,
          color: '#a2a38b',
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
      exportPDF: () => {
        const month2Head = Object.keys(month2Body[0]);
        const tempBody = month2Body.map(c => Object.values(c)) as any;
        FileUtils.exportPdf(month2FileName, month2Head, tempBody as any);
      },
      exportXLSX: () => {
        FileUtils.exportExcel(month2FileName, month2Body);
      },
      exportCSV: () => {
        FileUtils.exportCSV(month2FileName, month2Body);
      },

    };

    return [month1Dash, month2Dash];
  }

  mountColaboradorDailyDash(contas: ContaColaboradorDto[], short_date: string): EChartsOption[] {
    const dailyInfileName = `Movimentação de entrada - ${short_date}`;
    const contaIndex = contas.findIndex(c => c.short_date == short_date);

    if (contaIndex <= -1) {
      return [undefined, undefined];
    }

    const { assinatura_venda_valor, produto_venda_valor, servico_prestado_valor, devolucao_in_valor, } = contas[contaIndex];
    let dailyInBody = [{
      'Venda de assinaturas': assinatura_venda_valor,
      'Venda de produtos': produto_venda_valor,
      'Prestação de serviços': servico_prestado_valor,
      'Devoluções recebidas': devolucao_in_valor
    }];

    const dailyInDash: EChartsOption = {
      title: {
        left: '50%',
        text: 'Entrada de receita',
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        align: 'auto',
        bottom: 10,
        data: ['Venda de assinaturas', 'Venda de produtos', 'Prestação de serviços', 'Devoluções recebidas']
      },
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: [30, 110],
          roseType: 'radius',
          data: [
            { value: assinatura_venda_valor, name: 'Venda de assinaturas', itemStyle: { color: '#42A5F5' } },
            { value: produto_venda_valor, name: 'Venda de produtos', itemStyle: { color: '#66BB6A' } },
            { value: servico_prestado_valor, name: 'Prestação de serviços', itemStyle: { color: '#FFA726' } },
            { value: devolucao_in_valor, name: 'Devoluções recebidas', itemStyle: { color: '#b73dbf' } },
          ],
        }
      ],
      exportPDF: () => {
        const dailyInHead = Object.keys(dailyInBody[0]);
        const tempBody = dailyInBody.map(c => Object.values(c)) as any;
        FileUtils.exportPdf(dailyInfileName, dailyInHead, tempBody as any);
      },
      exportXLSX: () => {
        FileUtils.exportExcel(dailyInfileName, dailyInBody);
      },
      exportCSV: () => {
        FileUtils.exportCSV(dailyInfileName, dailyInBody);
      },
    };


    const dailyOutFileName = `Movimentação de saída - ${short_date}`;

    const {
      insumo_compra_valor, produto_compra_valor, pagamento_despesa_valor, pagamento_funcionario_valor,
      pagamento_evento_valor, pagamento_terceiros_valor, pagamento_outros_valor, devolucao_out_valor,
    } = contas[contaIndex];

    let dailyOutBody = [{
      'Compra de insumos': insumo_compra_valor,
      'Compra de produtos': produto_compra_valor,
      'Pagamento de despesas': pagamento_despesa_valor,
      'Pagamento de funcionários': pagamento_funcionario_valor,
      'Pagamento de eventos': pagamento_evento_valor,
      'Pagamento de terceiros': pagamento_terceiros_valor,
      'Pagamento outros': pagamento_outros_valor,
      'Devoluções concedidas': devolucao_out_valor,
    }];

    const dailyOutDash: EChartsOption = {
      title: {
        left: '50%',
        text: 'Saída de receita',
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        align: 'auto',
        bottom: 10,
        data: ['Compra de insumo', 'Compra de produto', 'PGTO. Despesa', 'PGTO. Funcionário', 'PGTO. Evento',
          'PGTO. Terceiros', 'PGTO. Outros', 'Devolução concedidas']
      },
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: [30, 110],
          roseType: 'radius',
          data: [
            { value: insumo_compra_valor, name: 'Compra de insumo', itemStyle: { color: '#42A5F5' } },
            { value: produto_compra_valor, name: 'Compra de produto', itemStyle: { color: '#66BB6A' } },
            { value: pagamento_despesa_valor, name: 'PGTO. Despesa', itemStyle: { color: '#FFA726' } },
            { value: pagamento_funcionario_valor, name: 'PGTO. Funcionário', itemStyle: { color: '#b73dbf' } },

            { value: pagamento_evento_valor, name: 'PGTO. Evento', itemStyle: { color: '#bf4c3d' } },
            { value: pagamento_terceiros_valor, name: 'PGTO. Terceiros', itemStyle: { color: '#bf7e3d' } },
            { value: pagamento_outros_valor, name: 'PGTO. Outros', itemStyle: { color: '#3dbfb2' } },
            { value: devolucao_out_valor, name: 'Devolução concedidas', itemStyle: { color: '#bf3d82' } },
          ],
        },
      ],
      exportPDF: () => {
        const dailyOutHead = Object.keys(dailyOutBody[0]);
        const tempBody = dailyOutBody.map(c => Object.values(c)) as any;
        FileUtils.exportPdf(dailyOutFileName, dailyOutHead, tempBody as any);
      },
      exportXLSX: () => {
        FileUtils.exportExcel(dailyOutFileName, dailyOutBody);
      },
      exportCSV: () => {
        FileUtils.exportCSV(dailyOutFileName, dailyOutBody);
      },
    };

    return [dailyInDash, dailyOutDash];
  }



  convertToSimpleDashCliente(dto: ContaClienteDto): SimpleDashboardDto {
    const {
      assinatura_compra_quantidade,
      assinatura_compra_valor,
      servico_tomado_quantidade,
      servico_tomado_valor,
      produto_compra_valor,
      produto_compra_quantidade,

      cash_in_valor,
      cash_in_quantidade,
      cash_out_valor,
      cash_out_quantidade,
      cash_total_valor,
    } = dto;

    return {
      assinatura_venda_valor: assinatura_compra_quantidade,
      assinatura_venda_quantidade: assinatura_compra_valor,

      servico_prestado_quantidade: servico_tomado_quantidade,
      servico_prestado_valor: servico_tomado_valor,

      produto_venda_valor: produto_compra_valor,
      produto_venda_quantidade: produto_compra_quantidade,
      cash_in_valor,
      cash_in_quantidade,
      cash_out_valor,
      cash_out_quantidade,
      cash_total_valor,
    }
  }

  convertToInOutSimpleDashCliente(dto: ContaClienteDto): EChartsOption {
    const {
      cash_in_valor,
      cash_out_valor,
      cash_total_valor,
    } = dto;


    const chart: EChartsOption = {
      title: {
        left: '50%',
        text: 'Entrada/Saída',
        subtext: '',
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        align: 'auto',
        bottom: 10,
        data: ['Total Entradas', 'Total Saídas']
      },
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: [30, 110],
          roseType: 'radius',
          data: [
            { value: cash_in_valor, name: 'Total em compras', },
            { value: cash_out_valor, name: 'Total em devoluções', },
          ],
        }
      ],
    };

    return chart;
  }


  mountClienteDash(data: DashboardClienteEntradaDto[]): EChartsOption {

    const body = [];
    const totais = [];
    const quantidades = [];
    const datas = [];

    data.forEach((d) => {
      const formattedDate = format(new Date(d.data), 'dd/MM/yy');

      body.push({
        "Data": formattedDate,
        "Total": d.total,
        "Quantidade": d.quantidade,
      });

      totais.push(d.total);
      quantidades.push(d.quantidade);
      datas.push(formattedDate);
    });


    const month1FileName = `Dash de cliente - ${new Date().toLocaleDateString('pt-BR')}`;


    const dashboard: EChartsOption = {
      legend: {
        data: ['Entrada (R$)', 'Quantidade'],
        align: 'left',
      },
      tooltip: {

      },
      yAxis: {},
      xAxis: {
        data: datas,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      series: [//Formatar para dinheiro
        {
          name: 'Entrada (R$)',
          type: 'bar',
          data: totais,
          animationDelay: (idx) => idx * 10,
          color: '#39e360',
        },
        {
          name: 'Quantidade',
          type: 'bar',
          data: quantidades,
          animationDelay: (idx) => idx * 10,
          color: '#39aae3',
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
      exportPDF: () => {
        const header = Object.keys(body[0]);
        const tempBody = body.map(c => Object.values(c)) as any;
        FileUtils.exportPdf(month1FileName, header, tempBody as any);
      },
      exportXLSX: () => {
        FileUtils.exportExcel(month1FileName, body);
      },
      exportCSV: () => {
        FileUtils.exportCSV(month1FileName, body);
      },
    };


    return dashboard;
  }

  getCurrentBackground(): string {
    return this.preferencesService.surfaceBackground;
  }
}
