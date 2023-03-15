import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserlistService } from '../../services/userlist.service';
import { Anime } from '../../types';
import { AnimeUserStatus } from '../../utils/options-enum';
import { MirrorPopoverComponent } from '../mirror-popover/mirror-popover.component';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss'],
})
export class AnimeDetailsComponent implements OnInit {
  @Input() anime!: Anime;

  showDescription: boolean = false;
  mirror: string = 'AnimeFLV';
  addedToList: boolean = false;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private userlistService: UserlistService
  ) {}

  async ngOnInit() {
    await this.checkIfAnimeExistsOnList();
  }

  toggleShowDescription() {
    this.showDescription = !this.showDescription;
  }

  loadScoreClass(score: number) {
    if (score > 0 && score <= 4) return 'bg-black-400';
    if (score > 4 && score <= 6) return 'bg-red-400';
    if (score > 6 && score <= 8) return 'bg-yellow-400';
    if (score > 8 && score <= 10) return 'bg-green-400';
    return '';
  }

  addAnimeToWatch() {
    this.userlistService.addAnimeToList({
      ...this.anime,
      userEpisodes: 0,
      userStatus: AnimeUserStatus.WATCHING,
    });
  }

  async checkIfAnimeExistsOnList() {
    const animeFromStorage = await this.userlistService.checkIfIsOnList(
      this.anime.mal_id
    );
    if (animeFromStorage) {
      this.anime = animeFromStorage;
      this.addedToList = true;
      return;
    }
    this.addedToList = false;
  }

  async openMirrorsModal($event: any) {
    const popover = await this.popoverController.create({
      component: MirrorPopoverComponent,
      backdropDismiss: true,
      event: $event,
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();
    this.mirror = data;

    console.log('open mirrors modal');
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
