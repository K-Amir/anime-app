import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnimeResponse } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SearchAnimeService {
  private page = 0;
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getSearchResults(textToSearch: string, resetPage: boolean = false) {
    if (resetPage) this.page = 0;
    this.page++;
    return this.httpClient.get<AnimeResponse>(
      `${this.apiUrl}/anime?q=${textToSearch}&limit=12&order_by=popularity&page=${this.page}`
    );
  }
}
