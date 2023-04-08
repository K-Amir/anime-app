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

  constructor(private userListService: UserlistService) {}

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

  categoryChanged(e: any) {
    this.slides.slideTo(this.selectedList);
  }

  async slideChanged() {
    this.selectedList = await this.slides.getActiveIndex();
    const el: any = this.segment['el'].children[this.selectedList];
    el.click();
  }
}
