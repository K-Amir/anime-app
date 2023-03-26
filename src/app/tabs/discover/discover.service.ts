import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimeResponse } from 'src/app/shared/types';
import { AnimeFilterEnum } from 'src/app/shared/utils/options-enum';
import { environment } from 'src/environments/environment';

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
