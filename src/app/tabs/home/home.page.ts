import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonSegment,
  IonSlides,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { AnimeDetailsComponent } from 'src/app/shared/components/anime-details/anime-details.component';
import { OptionsComponent } from 'src/app/shared/options/options.component';
import { UserlistService } from 'src/app/shared/services/userlist.service';
import { Anime } from 'src/app/shared/types';
import { AnimeUserStatus } from 'src/app/shared/utils/options-enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSegment) segment!: IonSegment;
  @ViewChild(IonSlides) slides!: IonSlides;

  watchingAnimes!: Anime[];
  planToWatchAnimes!: Anime[];
  completedAnimes!: Anime[];

  selectedList = 0;

  slideOpts = {
    speed: 400,
  };

  constructor(
    private popoverController: PopoverController,
    private userListService: UserlistService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.loadAnimes();
  }

  async loadAnimes() {
    const animeList = await this.userListService.getAnimeList();
    this.completedAnimes = animeList.filter(
      (x) => x.userStatus === AnimeUserStatus.COMPLETED
    );
    this.planToWatchAnimes = animeList.filter(
      (x) => x.userStatus === AnimeUserStatus.PLAN
    );
    this.watchingAnimes = animeList.filter(
      (x) => x.userStatus === AnimeUserStatus.WATCHING
    );
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
  }

  calcProgress(userEpisodes: number, totalEpisodes: number) {
    if (totalEpisodes === null) return 0;
    return userEpisodes / totalEpisodes;
  }

  async openAnimeDetailsModal(anime: Anime) {
    const modal = await this.modalController.create({
      component: AnimeDetailsComponent,
      componentProps: {
        anime: anime,
      },
    });

    await modal.present();
  }

  categoryChanged(e: any) {
    this.slides.slideTo(this.selectedList);
  }

  loadScoreClass(score: number) {
    if (score > 0 && score <= 4) return 'bg-black-400';
    if (score > 4 && score <= 6) return 'bg-red-400';
    if (score > 6 && score <= 8) return 'bg-yellow-400';
    if (score > 8 && score <= 10) return 'bg-green-400';
    return '';
  }

  async slideChanged() {
    this.selectedList = await this.slides.getActiveIndex();
    const el: any = this.segment['el'].children[this.selectedList];
    el.click();
  }
}
