import { Injectable, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Alert } from '../../interfaces/others/alert.dto';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements OnDestroy {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions = new Subscription();

  constructor(
    private readonly loaderController: LoadingController,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async autoALertLoader() {
    /*
    const sub = this.isLoading.
      subscribe(async value => {
        console.log(value);
        if (value) {
          await this.defaultLoader();
          console.log('CRIOU');
        } else {
          await this.dismissLoader();
          console.log('DIMISS');
        }
      });

    this.subscriptions.add(sub);*/

  }

  async presentCustomLoader({ cssClass, header, subHeader, message }: Alert) {
    const alert = await this.loaderController.create({
      //cssClass,
      message,
      backdropDismiss: false,
    });

    await alert.present();
  }
  async changeCustomLoader({ cssClass, header, subHeader, message }: Alert) {
    const alert = await this.loaderController.getTop();
    alert.cssClass = cssClass || alert.cssClass;
    alert.message = message || alert.message;
  }

  async defaultLoader() {
    const alert = await this.loaderController.create({
      message: "Carregando...",
      id: 'default',
      backdropDismiss: false,
    });
    await alert.present();
  }

  async dismissLoader() {
    try {
      await this.loaderController.dismiss();
      await this.loaderController.dismiss();
      await this.loaderController.dismiss();
      await this.loaderController.dismiss();
    } catch (e) { }
  }
}
