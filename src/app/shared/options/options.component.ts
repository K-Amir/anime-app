import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AnimeOptions } from '../utils/options-enum';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  open = AnimeOptions.OPEN;
  delete = AnimeOptions.DELETE;
  share = AnimeOptions.SHARE;
  addtobookmarks = AnimeOptions.ADDTOBOOKMARKS;
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  onClick(selectedOption: AnimeOptions) {
    this.popoverController.dismiss(selectedOption);
  }
}
