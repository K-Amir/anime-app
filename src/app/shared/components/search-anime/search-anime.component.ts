import { Component, OnInit, ViewChild } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  ModalController,
} from '@ionic/angular';
import { ErrorService } from '../../services/error.service';
import { Anime } from '../../types';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { SearchAnimeService } from './search-anime.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.scss'],
})
export class SearchAnimeComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  searchedAnimes: Anime[] = [];
  searchText: string = '';
  doneLoading: boolean = false;
  isLoading: boolean = false;
  noResultsAvailable: boolean = false;

  constructor(
    private modalController: ModalController,
    private searchAnimeService: SearchAnimeService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {}

  async openAnimeDetails(anime: Anime) {
    const animeModal = await this.modalController.create({
      component: AnimeDetailsComponent,
      componentProps: {
        anime,
      },
    });
    await animeModal.present();
  }

  onIonInfinite($event: any) {
    this.isLoading = true;
    if (this.doneLoading) {
      this.infiniteScroll.disabled = true;
      this.isLoading = false;
      return;
    }

    this.searchAnimeService.getSearchResults(this.searchText).subscribe({
      next: (response) => {
        if (response.data.length > 0) {
          this.searchedAnimes = [...this.searchedAnimes, ...response.data];
        } else {
          this.doneLoading = true;
        }
        ($event as InfiniteScrollCustomEvent).target.complete();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorService.showToastError(err.statusText);
      },
    });
  }

  onSearchChanged(searchText: string) {
    this.searchedAnimes = [];
    this.isLoading = true;
    this.noResultsAvailable = false;

    if (searchText === '') {
      this.isLoading = false;
      this.infiniteScroll.disabled = false;
      return;
    }

    const resetPage = true;
    this.doneLoading = false;
    this.searchText = searchText;
    this.searchAnimeService.getSearchResults(searchText, resetPage).subscribe({
      next: (response) => {
        if (response.data.length > 0) {
          this.searchedAnimes = response.data;
        } else {
          this.noResultsAvailable = true;
        }
        this.isLoading = false;
      },
    });
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
