import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiscoverService } from 'src/app/tabs/discover/discover.service';
import { ErrorService } from '../../services/error.service';
import { Anime, AnimeResponse } from '../../types';
import { AnimeFilterEnum } from '../../utils/options-enum';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';

@Component({
  selector: 'app-discover-card',
  templateUrl: './discover-card.component.html',
  styleUrls: ['./discover-card.component.scss'],
})
export class DiscoverCardComponent implements OnInit {
  @Input() animeType: AnimeFilterEnum = AnimeFilterEnum.POPULARITY;
  @Input() cardTitle: string = 'Most popular';

  animeList!: Anime[];

  constructor(
    private discoverService: DiscoverService,
    private errorService: ErrorService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async openAnimeModal(anime: Anime) {
    const animeInfoModal = await this.modalController.create({
      component: AnimeDetailsComponent,
      componentProps: {
        anime: anime,
      },
    });

    await animeInfoModal.present();
  }

  private loadData() {
    this.discoverService.getAnimes(this.animeType).subscribe({
      next: (res: AnimeResponse) => {
        this.animeList = res.data;
      },
      error: (err) => {
        this.errorService.showToastError(err.statusText);
      },
    });
  }
}
