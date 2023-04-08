import { Component, Input, OnInit } from '@angular/core';
import { Anime } from '../../types';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserlistService } from '../../services/userlist.service';
import { OptionsComponent } from '../../options/options.component';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss'],
})
export class AnimeListComponent implements OnInit {
  @Input() animeList!: Anime[];

  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async openAnimeDetailsModal(anime: Anime) {
    const modal = await this.modalController.create({
      component: AnimeDetailsComponent,
      componentProps: {
        anime: anime,
      },
    });

    await modal.present();
  }

  calcProgress(userEpisodes: number, totalEpisodes: number) {
    if (totalEpisodes === null) return 0;
    return userEpisodes / totalEpisodes;
  }

  async openAnimeSettings(e: Event) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: e,
      showBackdrop: false,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    // Action

    console.log(data);
  }

  loadScoreClass(score: number) {
    if (score > 0 && score <= 4) return 'bg-black-400';
    if (score > 4 && score <= 6) return 'bg-red-400';
    if (score > 6 && score <= 8) return 'bg-yellow-400';
    if (score > 8 && score <= 10) return 'bg-green-400';
    return '';
  }
}
