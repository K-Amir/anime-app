import { Component, Input, OnInit } from '@angular/core';
import { OptionModal } from '../../types/option-modal.types';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.scss'],
})
export class OptionsModalComponent implements OnInit {
  @Input() title!: string;
  @Input() options!: OptionModal[];

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    console.log(this.options);
  }

  selectOption(option: OptionModal) {
    this.popoverController.dismiss(option);
  }
}
