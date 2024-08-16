import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
import * as mime from "mime";
import * as saveAs from 'file-saver';
import jsPDF from 'jspdf';

import { DOCS_DIR } from './../../../../../config/app.config';
import { ToastMessageService } from '../../toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../constants/toast.constant';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CameraUtils } from 'src/app/shared/utils/CameraUtils';
import { LoaderService } from '../../app-loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private readonly platform: Platform,
    private readonly toastService: ToastMessageService,
    private readonly loaderService: LoaderService,
  ) { }

  async saveUrlFile(file: string, fileName: string, shouldLoad = true) {
    await this.loaderService.presentCustomLoader({
      header: 'Aguarde',
      message: 'Baixando arquivo',
    });

    fileName = fileName.trim().replace(/[\\/:"*?<>|]+/g, '-');
    const platforms = this.platform.platforms();

    const type = mime.getExtension(fileName) as any;

    try {
      if (platforms.includes('android')) {
        await this.createFolder();
        await this.saveAndroidUrlFile(file, fileName);
      }

      if (platforms.includes('ios')) {
        await this.createFolder();
        await this.saveIosUrlFile(file, fileName);
      }

      await this.saveWebUrlFile(file, fileName);
      this.toastService.presentToast({
        titulo: 'Baixando arquivo',
        detalhe: fileName,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.SUCESSO,
      });
    } catch (error) {
      const message = error.message.toLowerCase().trim().includes('user denied permission request')
        ? 'Precisamos da sua permissão para baixar o arquivo.' : error.message;

      this.toastService.presentToast({
        titulo: 'Erro ao baixar arquivo',
        detalhe: message,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ERRO,
      });
      console.error('Erro ao salvar o arquivo:', error);
    }

    await this.loaderService.dismissLoader();
  }

  async saveFile(file: File, shouldLoad = true) {
    await this.loaderService.presentCustomLoader({
      header: 'Aguarde',
      message: 'Baixando arquivo',
    });
    const platforms = this.platform.platforms();
    const fileName = file.name;

    try {
      if (platforms.includes('android')) {
        await this.createFolder();
        await this.saveAndroidFile(file, fileName);
      }

      if (platforms.includes('ios')) {
        await this.createFolder();
        await this.saveIosFile(file, fileName);
      }

      await this.saveWebFile(file, fileName);
      this.toastService.presentToast({
        titulo: 'Baixando arquivo',
        detalhe: fileName,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.SUCESSO,
      });
    } catch (error) {
      const message = error.message.toLowerCase().trim().includes('user denied permission request')
        ? 'Precisamos da sua permissão para baixar o arquivo.' : error.message;

      this.toastService.presentToast({
        titulo: 'Erro ao baixar arquivo',
        detalhe: message,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ERRO,
      });
      console.error('Erro ao salvar o arquivo:', error);
    }
    await this.loaderService.dismissLoader();
  }

  async savePdfFromJS(pdf: jsPDF, fileName: string, shouldLoad = true) {
    await this.loaderService.presentCustomLoader({
      header: 'Aguarde',
      message: 'Baixando arquivo',
    });
    fileName = fileName.trim().replace(/[\\/:"*?<>|]+/g, '-');
    const platforms = this.platform.platforms();

    try {
      if (platforms.includes('android')) {
        await this.createFolder();
        await this.saveAndroidPdfFile(pdf, fileName);
      }

      if (platforms.includes('ios')) {
        await this.createFolder();
        // await this.saveIosPdfFile(pdf, fileName);
      }

      await this.saveWebPdfFile(pdf, fileName);
      this.toastService.presentToast({
        titulo: 'Baixando arquivo',
        detalhe: fileName,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.SUCESSO,
      });
    } catch (error) {
      const message = error.message.toLowerCase().trim().includes('user denied permission request')
        ? 'Precisamos da sua permissão para baixar o arquivo.' : error.message;

      this.toastService.presentToast({
        titulo: 'Erro ao baixar arquivo',
        detalhe: message,
        duracao: ToastEnum.mediumDuration,
        gravidade: ToastPrimeSeverityEnum.ERRO,
      });
      console.error('Erro ao salvar o arquivo:', error);
    }
    await this.loaderService.dismissLoader();
  }

  //#region WEB
  private async saveWebUrlFile(file: string, fileName: string) {
    saveAs(file, fileName);
  }
  private async saveWebFile(file: File, fileName: string) {
    saveAs(file, fileName);
  }
  private async saveWebPdfFile(pdf: jsPDF, fileName: string) {
    pdf.save(fileName);
  }
  //#endregion

  //#region ANDROID
  private async saveAndroidUrlFile(urlFile: string, fileName: string) {
    const response = await fetch(urlFile);
    const blob = await response.blob();
    const data = await CameraUtils.convertBlobToBase64(blob) as string;

    const filePath = `${DOCS_DIR}/${fileName}`;

    await Filesystem.appendFile({
      path: filePath,
      data,
      directory: Directory.Documents,
    });

    console.log(`Arquivo salvo em: ${filePath}`);
  }
  private async saveAndroidFile(file: File, fileName: string) {
    const blob = new Blob([file], { type: file.type });
    const data = await CameraUtils.convertBlobToBase64(blob) as string;

    const filePath = `${DOCS_DIR}/${fileName}`;

    await Filesystem.appendFile({
      path: filePath,
      data,
      directory: Directory.Documents,
    });

    console.log(`Arquivo salvo em: ${filePath}`);
  }

  private async saveAndroidPdfFile(pdf: jsPDF, fileName: string) {
    const filePath = `${DOCS_DIR}/${fileName}`;

    await Filesystem.appendFile({
      path: filePath,
      data: pdf.output('datauristring'),
      directory: Directory.Documents,
    });

    console.log(`Arquivo salvo em: ${filePath}`);
  }
  //#endregion

  //#region IOS
  private async saveIosUrlFile(urlFile: string, fileName: string) {
    const response = await fetch(urlFile);
    const blob = await response.blob();
    const data = await CameraUtils.convertBlobToBase64(blob) as string;

    const filePath = `${DOCS_DIR}/${fileName}`;

    await Filesystem.appendFile({
      path: filePath,
      data,
      directory: Directory.Documents,
    });

    console.log(`Arquivo salvo em: ${filePath}`);
  }
  private async saveIosFile(file: File, fileName: string) {
    const blob = new Blob([file], { type: file.type });
    const data = await CameraUtils.convertBlobToBase64(blob) as string;

    const filePath = `${DOCS_DIR}/${fileName}`;

    await Filesystem.appendFile({
      path: filePath,
      data,
      directory: Directory.Documents,
    });

    console.log(`Arquivo salvo em: ${filePath}`);
  }
  //#endregion

  private async createFolder() {
    try {
      await Filesystem.mkdir({
        directory: Directory.Documents,
        path: `${DOCS_DIR}`,
        recursive: true,
      });
    } catch (e) {
      console.error('Pasta não criada: ' + e.message);
    }
  }
}
