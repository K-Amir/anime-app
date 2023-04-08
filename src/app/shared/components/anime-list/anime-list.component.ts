import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Anime } from '../../types';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { OptionsComponent } from '../../options/options.component';
import { AnimeOptions } from '../../utils/options-enum';
import { UserlistService } from '../../services/userlist.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss'],
})
export class AnimeListComponent implements OnInit {
  @Input() animeList!: Anime[];
  @Output() updatedAnime: EventEmitter<any> = new EventEmitter();

  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private userListService: UserlistService
  ) {}

  ngOnInit() {}

  async openAnimeDetailsModal(anime: Anime) {
    console.log(anime);
    const modal = await this.modalController.create({
      component: AnimeDetailsComponent,
      componentProps: {
        anime: anime,
      },
    });

    await modal.present();

    modal.onWillDismiss().then(() => {
      this.updatedAnime.emit();
    });
  }

  calcProgress(userEpisodes: number, totalEpisodes: number) {
    if (totalEpisodes === null) return 0;
    return userEpisodes / totalEpisodes;
  }

  async openAnimeSettings(e: Event, anime: Anime) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: e,
      showBackdrop: false,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();

    if (data === AnimeOptions.DELETE) {
      this.userListService.deleteFromList(anime).then(() => {
        this.animeList = this.animeList.filter((x) => x.mal_id != anime.mal_id);
        this.updatedAnime.emit();
      });
    }

    if (data === AnimeOptions.OPEN) {
      await this.openAnimeDetailsModal(anime);
    }
  }

  loadScoreClass(score: number) {
    if (score > 0 && score <= 4) return 'bg-black-400';
    if (score > 4 && score <= 6) return 'bg-red-400';
    if (score > 6 && score <= 8) return 'bg-yellow-400';
    if (score > 8 && score <= 10) return 'bg-green-400';
    return '';
  }
}
