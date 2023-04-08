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
    if (!animeList) {
      await this.storageService.set('user-anime-list', []);
      return [];
    }
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
    return updatedAnime;
  }

  async changeAnimeStatus(anime: Anime, status: AnimeUserStatus) {
    const animeList = await this.getAnimeList();
  }

  async addAnimeToList(anime: Anime): Promise<Anime> {
    const animeList = await this.getAnimeList();
    const newList = [...animeList, anime];

    await this.storageService.set('user-anime-list', newList);
    return anime;
  }

  async checkIfIsOnList(mal_id: number): Promise<Anime | undefined> {
    const animeList = await this.getAnimeList();
    return animeList.find((x) => x.mal_id === mal_id);
  }
}
