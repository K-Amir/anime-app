import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toastController: ToastController) {}

  async showToastError(error: string) {
    const toast = await this.toastController.create({
      duration: 2500,
      message: error,
      position: 'top',
    });

    await toast.present();
  }
}
