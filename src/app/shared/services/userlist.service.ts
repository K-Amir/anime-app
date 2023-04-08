import { Injectable } from '@angular/core';
import { Anime } from '../types';
import { AnimeUserStatus } from '../utils/options-enum';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserlistService {
  currentList: BehaviorSubject<Anime[]> = new BehaviorSubject<Anime[]>([]);

  constructor(private storageService: StorageService) {
    this.getAnimeList();
  }

  async getAnimeList(): Promise<Anime[]> {
    const animeList = await this.storageService.get('user-anime-list');
    if (!animeList) {
      await this.storageService.set('user-anime-list', []);
      return [];
    }
    this.currentList.next(animeList);
    return animeList;
  }

  async updateEpisodeWatching(
    animeToUpdate: Anime
  ): Promise<Anime | undefined> {
    const animeList = await this.getAnimeList();
    let updatedAnime;
    const newList = animeList.map((anime) => {
      if (anime.mal_id === animeToUpdate.mal_id) {
        updatedAnime = {
          ...anime,
          userEpisodes: anime.userEpisodes ? anime.userEpisodes + 1 : 1,
        };
        return updatedAnime;
      }
      return anime;
    });

    await this.storageService.set('user-anime-list', newList);
    this.currentList.next(newList);
    return updatedAnime;
  }

  async deleteFromList(anime: Anime) {
    const animeList = await this.getAnimeList();
    const newList = animeList.filter((x) => x.mal_id != anime.mal_id);
    await this.storageService.set('user-anime-list', newList);
    this.currentList.next(newList);
  }

  async changeAnimeStatus(anime: Anime, status: AnimeUserStatus) {
    const animeList = await this.getAnimeList();
    const newList = animeList.map((x) => {
      if (x.mal_id === anime.mal_id) {
        return { ...x, userStatus: status };
      }
      return x;
    });

    await this.storageService.set('user-anime-list', newList);
    this.currentList.next(newList);
  }

  async addAnimeToList(anime: Anime): Promise<Anime> {
    const animeList = await this.getAnimeList();
    const newList = [...animeList, anime];

    await this.storageService.set('user-anime-list', newList);
    this.currentList.next(newList);
    return anime;
  }

  async checkIfIsOnList(mal_id: number): Promise<Anime | undefined> {
    const animeList = await this.getAnimeList();
    return animeList.find((x) => x.mal_id === mal_id);
  }
}
