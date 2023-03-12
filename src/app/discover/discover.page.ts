import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SearchAnimeComponent } from '../shared/components/search-anime/search-anime.component';
import { Anime, AnimeResponse } from '../shared/types';
import { DiscoverService } from './discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  // Variables
  beingWatchedAnime!: Anime[];

  constructor(
    private discoverService: DiscoverService,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async onSearch() {
    const modal = await this.modalController.create({
      component: SearchAnimeComponent,
    });

    await modal.present();
  }

  private loadData() {
    this.discoverService.getPopularAnime().subscribe({
      next: (res: AnimeResponse) => {
        this.beingWatchedAnime = res.data;
      },
      error: (error) => {
        this.showError();
      },
    });
  }

  private showError() {
    this.toastController
      .create({
        message: 'Error loading page, re-open app to fix it',
        duration: 1500,
        position: 'top',
        mode: 'ios',
      })
      .then((toast) => toast.present());
  }
}
