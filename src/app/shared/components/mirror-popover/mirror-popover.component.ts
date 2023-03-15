import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-mirror-popover',
  templateUrl: './mirror-popover.component.html',
  styleUrls: ['./mirror-popover.component.scss'],
})
export class MirrorPopoverComponent implements OnInit {
  animeflv = 'AnimeFLV';
  monoschinos2 = 'MonosChinos2';
  tioanime = 'tioanime';
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  selectMirror(mirror: string) {
    this.popoverController.dismiss(mirror);
  }
}
