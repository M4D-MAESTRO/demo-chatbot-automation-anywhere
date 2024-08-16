import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import jsPDF from 'jspdf';
import autoTable, { RowInput, } from 'jspdf-autotable';

import { LoaderService } from '../app-loader/loader.service';
import { FilesService } from '../utils/files/files.service';

import { ImovelDto } from '../../interfaces/imoveis/imovel.dto';
import { UserDto } from '../../interfaces/users/user.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private readonly http: HttpClient,
    private readonly loaderService: LoaderService,
    private readonly filesService: FilesService,
  ) { }


  async getImovelCompletoPdf(imovel: ImovelDto) {

    await this.loaderService.presentCustomLoader({
      cssClass: null,
      header: `Aguarde`,
      message: `Gerando PDF`
    });

    const { numero_rgi, numero_iptu } = imovel;
    const fileName = `[Imovel] ${numero_rgi} - ${numero_iptu} em ${new Date().toLocaleDateString('pt-BR')}.pdf`;

    const doc = new jsPDF('p', 'mm', 'a4');

    // Informações do Imóvel 
    doc.text('Informações do Imóvel', 10, 20);
    const imovel1Headers = ['ID do imóvel', 'Bloco/Apartamento', 'Nome do bloco'];
    const imovel1Data = [
      [
        imovel.id,
        `${imovel.numero_bloco}/${imovel.apartamento_casa}`,
        `${imovel.nome_bloco || 'Não informado'}`
      ]
    ]
    autoTable(doc, {
      startY: 30,
      head: [imovel1Headers],
      body: imovel1Data,
      styles: { valign: 'middle', halign: 'center' },
    });

    const imovel2Headers = ['Inscrição IPTU', 'Inscrição RGI'];
    const imovel2Data = [
      [
        imovel.numero_iptu,
        imovel.numero_rgi,
      ]
    ]
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [imovel2Headers],
      body: imovel2Data,
      styles: { valign: 'middle', halign: 'center' },
    });
    this.addLineSeparatorPdf(doc);
    this.addBreakRowPdf(doc);

    this.addUserToPdf(doc, '1° Preponente', imovel.preponente1, false);
    this.addLineSeparatorPdf(doc);

    this.addUserToPdf(doc, '2° Preponente', imovel.preponente2);
    this.addLineSeparatorPdf(doc);

    this.addUserToPdf(doc, '3° Preponente', imovel.preponente3);
    this.addLineSeparatorPdf(doc);

    this.addUserToPdf(doc, 'Inquilino', imovel.inquilino);
    this.addLineSeparatorPdf(doc);

    this.addUserToPdf(doc, 'Proprietário de Repasse', imovel.proprietario_repasse);
    this.addLineSeparatorPdf(doc);

    // Salva o arquivo
    await this.filesService.savePdfFromJS(doc, fileName);
    await this.loaderService.dismissLoader();
  }

  private addUserToPdf(doc: jsPDF, title: string, user?: UserDto, shouldAddPage = true) {
    let nextY = (doc as any).lastAutoTable.finalY + 10;
    if (shouldAddPage) {
      doc.addPage();
      nextY = 30;
    }

    if (!user) {
      doc.text(title, 10, nextY);
      autoTable(doc, {
        startY: nextY + 10,
        head: [['Não cadastrado']],
        body: [['Não cadastrado']],
        styles: { valign: 'middle', halign: 'center' },
      });
      return;
    }

    doc.text(title, 10, nextY);
    const user1Headers = ['Nome',];
    const user1Data = [
      [
        user.nome,
      ]
    ];
    autoTable(doc, {
      startY: nextY + 10,
      head: [user1Headers],
      body: user1Data,
      styles: { valign: 'middle', halign: 'center' },
    });

    const user2Headers = ['CPF', 'RG'];
    const user2Data = [
      [
        user.cpf,
        user.identidade
      ]
    ];
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [user2Headers],
      body: user2Data,
      styles: { valign: 'middle', halign: 'center' },
    });

    const user3Headers = ['N° Celular', 'N° Alternativo'];
    const user3Data = [
      [
        user.tel1,
        user.tel2 || 'Não informado'
      ]
    ];
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [user3Headers],
      body: user3Data,
      styles: { valign: 'middle', halign: 'center' },
    });

    const user4Headers = ['E-mail', 'Data de Nascimento'];
    const user4Data = [
      [
        user.email,
        new Date(user.data_nascimento).toLocaleDateString('pt-BR')
      ]
    ];
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [user4Headers],
      body: user4Data,
      styles: { valign: 'middle', halign: 'center' },
    });

    // Tabela de Dependentes
    doc.text('Dependentes', 10, (doc as any).lastAutoTable.finalY + 10);
    if (user.dependentes.length <= 0) {
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [['Dependentes']],
        body: [['Sem dependentes cadastrados']],
        styles: { valign: 'middle', halign: 'center' },
      });
    } else {
      const depHeaders = ['Nome', 'CPF', 'Grau de Parentesco'];
      const depData = user.dependentes.map((d, i) => [
        d.user_dependente.nome,
        d.user_dependente.cpf,
        d.grau_parentesco
      ]);
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [depHeaders],
        body: depData,
        styles: { valign: 'middle', halign: 'center' },
      });
    }

    // Tabela de Pets
    doc.text('Pets', 10, (doc as any).lastAutoTable.finalY + 10);
    if (user.pets.length <= 0) {
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [['Pets']],
        body: [['Sem pets cadastrados']],
        styles: { valign: 'middle', halign: 'center' },
      });
    } else {
      const petHeaders = ['Nome', 'Espécie'];
      const petData = user.pets.map((p) => [p.nome, p.especie]);
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [petHeaders],
        body: petData,
        styles: { valign: 'middle', halign: 'center' },
      });
    }
  }

  private addLineSeparatorPdf(doc: jsPDF) {
    const startY = (doc as any).lastAutoTable.finalY;

    // Define a cor e a largura da linha
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);

    // Adiciona a linha horizontal
    doc.line(10, startY + 2, 200, startY + 2);
  }

  private addBreakRowPdf(doc: jsPDF) {
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      styles: { valign: 'middle', halign: 'center' },
    });
  }
}
