import { Injectable } from '@angular/core';
import { Anime } from '../types';
import { AnimeUserStatus } from '../utils/options-enum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserlistService {
  constructor(private storageService: StorageService) {}

  async getAnimeList(): Promise<Anime[]> {
    const animeList = await this.storageService.get('user-anime-list');
    console.log(animeList);
    if (!animeList) {
      await this.storageService.set('user-anime-list', []);
      return [];
    }
    return animeList;
  }

  async changeAnimeStatus(anime: Anime, status: AnimeUserStatus) {
    const animeList = await this.getAnimeList();
  }

  async addAnimeToList(anime: Anime) {
    const animeList = await this.getAnimeList();
    const newList = [...animeList, anime];

    await this.storageService.set('user-anime-list', newList);
  }

  async checkIfIsOnList(mal_id: number): Promise<Anime | undefined> {
    const animeList = await this.getAnimeList();
    return animeList.find((x) => x.mal_id === mal_id);
  }
}
