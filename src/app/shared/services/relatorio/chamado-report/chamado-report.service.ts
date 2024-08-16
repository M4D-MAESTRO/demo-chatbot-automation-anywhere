import { ChamadoDto } from './../../../interfaces/chamados/chamado.dto';
import { ChamadoStatusEnum } from './../../../constants/chamado.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import jsPDF from 'jspdf';
import autoTable, { RowInput, } from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { Chart } from 'chart.js';

import { LoaderService } from '../../app-loader/loader.service';
import { FilesService } from '../../utils/files/files.service';
import { ExcelUtils } from './../../../utils/ExcelUtils';
import { Worksheet } from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ChamadoReportService {

  constructor(
    private readonly http: HttpClient,
    private readonly loaderService: LoaderService,
    private readonly filesService: FilesService,
  ) { }

  async exportPdf(fileName: string, head: string[], body: string[][]) {

    const doc = new jsPDF('l', 'mm', 'a4');
    autoTable(doc, {
      head: [head],
      body,
      didDrawCell: (data) => { },
    });

    await this.filesService.savePdfFromJS(doc, `${fileName}.pdf`);
  }

  async exportExcel(fileName: string, data: any) {
    const [newFileName, workbook] = ExcelUtils.startExcel(fileName);

    const reportSheet = workbook.addWorksheet('report');
    const metaReport = workbook.addWorksheet('meta');

    const meta = this.addReportSheet(data, reportSheet);
    this.addMetaSheet(meta, metaReport);

    const buffer = await workbook.xlsx.writeBuffer();
    await this.saveAsExcelFile(buffer, newFileName);
  }

  async exportCSV(fileName: string, data: any) {
    const [newFileName, workbook] = ExcelUtils.startCsv(fileName);

    const reportSheet = workbook.addWorksheet('report');
    const metaReport = workbook.addWorksheet('meta');

    const meta = this.addReportSheet(data, reportSheet);
    this.addMetaSheet(meta, metaReport);

    const buffer = await workbook.csv.writeBuffer();
    await this.saveAsCsvFile(buffer, newFileName);
  }

  async saveAsExcelFile(buffer: any, fileName: string) {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    const file: File = new File([data], fileName + EXCEL_EXTENSION, { type: EXCEL_TYPE })

    // FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    await this.filesService.saveFile(file);
  }

  async saveAsCsvFile(buffer: any, fileName: string) {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.csv';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    const file: File = new File([data], fileName + EXCEL_EXTENSION, { type: EXCEL_TYPE })

    // FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    await this.filesService.saveFile(file);
  }

  private addReportSheet(chamados: ChamadoDto[], sheet: Worksheet) {
    let quantAberto = 0;
    let quantConcluido = 0;
    let quantCancelado = 0;
    let quantPendente = 0;
    let quantAndamento = 0;

    const header = [
      "id",
      "Solicitante",
      "Executor",
      "Encerrante",
      "OBS Geral",
      "Status",
      "Tipo",
      "Empresa",
      "Tempo de SLA (h)",
      "Tempo decorrido (h)",
      "Descrições do serviço",
      "Observações do serviço",
      "Produtos utilizados",
      "Anotações de fechamento",
      "Data de solicitação",
      "Data de fechamento",
    ];

    sheet.addRow(header);

    chamados.forEach(c => {

      switch (c.status) {
        case ChamadoStatusEnum.ABERTO:
          quantAberto++;
          break;

        case ChamadoStatusEnum.ANDAMENTO:
          quantAndamento++;
          break;

        case ChamadoStatusEnum.CANCELADO:
          quantCancelado++;
          break;

        case ChamadoStatusEnum.CONCLUIDO:
          quantConcluido++;
          break;

        case ChamadoStatusEnum.PENDENTE:
          quantPendente++;
          break;
      }

      const row = [
        c.id,
        c.solicitante.nome,
        c.executor?.nome || 'Não informado',
        c.encerrante?.nome || 'Não informado',
        c.observacao_geral,
        c.status,
        c.tipo,
        c.nome_empresa || 'Não se aplica',
        c.tempo_sla || '-',
        c.tempo_execucao || '-',
        c.descricoes_servico?.join(';\n ') || '-',
        c.observacoes_servico?.join(';\n ') || '-',
        c.produtos_utilizados?.join(';\n ') || '-',
        c.anotacoes_fechamento?.join(';\n ') || '-',
        new Date(c.created_at).toLocaleDateString(),
        c.closed_at ? new Date(c.closed_at).toLocaleDateString() : 'Não encerrado',
      ]

      sheet.addRow(row);
    });

    const report = [
      quantAberto,
      quantConcluido,
      quantCancelado,
      quantPendente,
      quantAndamento,
    ];

    return report;
  }

  private addMetaSheet(meta: number[], sheet: Worksheet) {
    sheet.addRow(['Aberto', 'Concluído', 'Cancelado', 'Pendente', 'Andamento']);
    sheet.addRow(meta);
  }
}
