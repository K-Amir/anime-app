import { Component, OnInit } from '@angular/core';
import { OAuth2Client } from '@byteowls/capacitor-oauth2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    OAuth2Client.authenticate({});
  }
}
