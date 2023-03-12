import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title!: string;

  @Input() showSearchInput: boolean = false;
  @Input() showSearch: boolean = false;
  @Input() showBackButton: boolean = false;
  @Input() showTitle: boolean = false;
  @Input() showManualBackButton: boolean = false;

  @Output() searchClicked: EventEmitter<any> = new EventEmitter();
  @Output() manualBackButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() searchChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSearchChange($event: any) {
    const searchText = $event.detail.value;
    this.searchChanged.emit(searchText);
  }

  onManualBack() {
    this.manualBackButtonClicked.emit();
  }

  onSearch() {
    this.searchClicked.emit();
  }
}
