import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $loggedIn: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}
}
