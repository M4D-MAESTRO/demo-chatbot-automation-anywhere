
import { Injectable, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import * as blobUtil from 'blob-util';

import { CameraUtils } from '../../utils/CameraUtils';
import { LoaderService } from '../app-loader/loader.service';
import { ToastMessageService } from '../toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from '../../constants/toast.constant';
import { IMAGE_DIR } from './../../../../config/app.config';
import { ArquivoLocalDto } from '../../interfaces/arquivos/arquivo-local.dto';
import { PreferencesService } from '../preferences/preferences.service';

@Injectable({
  providedIn: 'root'
})
export class AnexosService implements OnDestroy {

  private fileSelected: File;
  private fileSelectedName: string;

  constructor(
    private readonly loaderService: LoaderService, 
    private readonly toastService: ToastMessageService,
    private readonly platform: Platform,
    private readonly preferenceService: PreferencesService,
  ) { }

  ngOnDestroy(): void {
    this.clearFile();
  }

  getFileSelectedName(): string { return this.fileSelectedName };
  getFileSelected(): File { return this.fileSelected };

  getFileButtonFill() {
    const currentTheme = this.preferenceService.getThemePreference();
    if (currentTheme == 'dark') {
      return 'outline';
    }

    return 'solid';
  }

  clearFile() {
    this.fileSelected = undefined;
    this.fileSelectedName = undefined;
  }

  setFile(file: File) {
    this.fileSelectedName = `${file.name} - ${(file.size / 1000).toFixed(2)}KB`;
    this.fileSelected = file;
  }

  async setBase64File(base64String: string) {
    const file = await fetch(base64String)
      .then(async res => {
        const blob = await res.blob();

        return new File([blob], `Assinatura - ${new Date().toLocaleDateString('pt-BR')}.png`, { type: 'image/png' })
      });
    this.fileSelectedName = `${file.name} - ${(file.size / 1000).toFixed(2)}KB`;
    this.fileSelected = file;
    return file;
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.setFile(file);
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if (image) {
      await this.loaderService.presentCustomLoader({
        header: 'Aguarde',
        message: 'Salvando sua foto',
      });
      try {
        await this.saveImage(image);
      } catch (e) {
        console.error(e.message)

        this.toastService.presentToast({
          titulo: 'Falha ao salvar a foto',
          detalhe: e.message,
          duracao: ToastEnum.mediumDuration,
          gravidade: ToastPrimeSeverityEnum.ERRO,
        });
      }
     await this.loaderService.dismissLoader();
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await CameraUtils.readAsBase64(photo, this.platform);
    const fileName = new Date().getTime() + '.png';

    try {
      await Filesystem.mkdir({
        directory: Directory.Documents,
        path: `${IMAGE_DIR}`,
        recursive: true,
      });
    } catch (e) {
      console.error('Pasta não criada: ' + e.message);
    }

    await Filesystem.writeFile({
      directory: Directory.Documents,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });

    const readFile = await Filesystem.readFile({
      path: `${IMAGE_DIR}/${fileName}`,
      directory: Directory.Documents,
    });

    const localPhoto: ArquivoLocalDto = {
      data: `data:image/png;base64,${readFile.data}`,
      name: fileName,
      path: `${IMAGE_DIR}/${fileName}`
    }

    const response = await fetch(localPhoto.data);
    const blob = await response.blob();

    const file = new File([blob], fileName, { type: 'image/png' });

    this.fileSelectedName = `${fileName} - ${(blob.size / 1000).toFixed(2)}KB`;
    this.fileSelected = file;
  }


}
