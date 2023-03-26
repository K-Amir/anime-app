import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchAnimeComponent } from 'src/app/shared/components/search-anime/search-anime.component';
import { AnimeFilterEnum } from 'src/app/shared/utils/options-enum';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  popularity = AnimeFilterEnum.POPULARITY;
  upcoming = AnimeFilterEnum.UPCOMING;
  airing = AnimeFilterEnum.AIRING;
  favorites = AnimeFilterEnum.FAVORITE;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async onSearch() {
    const modal = await this.modalController.create({
      component: SearchAnimeComponent,
    });

    await modal.present();
  }
}
