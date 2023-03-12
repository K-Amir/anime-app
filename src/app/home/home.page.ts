import { Component, ViewChild } from '@angular/core';
import { IonSegment, IonSlides, PopoverController } from '@ionic/angular';
import { OptionsComponent } from '../shared/options/options.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonSegment) segment!: IonSegment;
  @ViewChild(IonSlides) slides!: IonSlides;

  selectedList = 0;

  slideOpts = {
    speed: 400,
  };

  constructor(private popoverController: PopoverController) {}

  async openAnimeSettings(e: Event) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: e,
      showBackdrop: false,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    // Action
  }

  categoryChanged(e: any) {
    this.slides.slideTo(this.selectedList);
  }

  async slideChanged() {
    this.selectedList = await this.slides.getActiveIndex();
    const el: any = this.segment['el'].children[this.selectedList];
    el.click();
  }
}
