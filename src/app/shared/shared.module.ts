import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { OptionsComponent } from './options/options.component';
import { SearchAnimeComponent } from './components/search-anime/search-anime.component';
import { DiscoverCardComponent } from './components/discover-card/discover-card.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { SliceTitlePipe } from './pipes/pipes.pipe';
import { MirrorPopoverComponent } from './components/mirror-popover/mirror-popover.component';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { OptionsModalComponent } from './components/options-modal/options-modal.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    OptionsComponent,
    SearchAnimeComponent,
    DiscoverCardComponent,
    AnimeDetailsComponent,
    SliceTitlePipe,
    MirrorPopoverComponent,
    AnimeListComponent,
    OptionsModalComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    ToolbarComponent,
    OptionsComponent,
    SearchAnimeComponent,
    DiscoverCardComponent,
    AnimeDetailsComponent,
    SliceTitlePipe,
    MirrorPopoverComponent,
    AnimeListComponent,
    OptionsModalComponent,
  ],
})
export class SharedModule {}
