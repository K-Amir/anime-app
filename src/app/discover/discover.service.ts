import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnimeResponse } from '../shared/types';
import { AnimeFilterEnum } from '../shared/utils/options-enum';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpCLient: HttpClient) {}

  getAnimes(filter: AnimeFilterEnum) {
    return this.httpCLient.get<AnimeResponse>(
      `${this.apiUrl}/top/anime?filter=${filter}`
    );
  }
}
