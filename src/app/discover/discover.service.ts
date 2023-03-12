import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnimeResponse } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpCLient: HttpClient) {}

  getPopularAnime() {
    return this.httpCLient.get<AnimeResponse>(
      `${this.apiUrl}/top/anime?filter=bypopularity`
    );
  }
}
