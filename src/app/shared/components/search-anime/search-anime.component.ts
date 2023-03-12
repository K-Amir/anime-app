import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ErrorService } from '../../services/error.service';
import { Anime } from '../../types';
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

  constructor(
    private modalController: ModalController,
    private searchAnimeService: SearchAnimeService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {}

  onIonInfinite($event: any) {
    if (this.doneLoading) return;

    this.searchAnimeService.getSearchResults(this.searchText).subscribe({
      next: (response) => {
        if (response.data.length > 0) {
          this.searchedAnimes = [...this.searchedAnimes, ...response.data];
        } else {
          this.doneLoading = true;
        }
      },
      error: (err) => {
        this.errorService.showToastError(err.statusText);
      },
    });
    this.infiniteScroll.complete();
  }

  onSearchChanged(searchText: string) {
    if (searchText === '') {
      this.searchedAnimes = [];
      return;
    }

    const resetPage = true;
    this.doneLoading = false;
    this.searchText = searchText;
    this.searchAnimeService.getSearchResults(searchText, resetPage).subscribe({
      next: (response) => {
        if (response.data.length > 0) {
          this.searchedAnimes = response.data;
        }
      },
    });
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
