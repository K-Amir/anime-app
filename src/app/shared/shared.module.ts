import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { OptionsComponent } from './options/options.component';
import { SearchAnimeComponent } from './components/search-anime/search-anime.component';

@NgModule({
  declarations: [ToolbarComponent, OptionsComponent, SearchAnimeComponent],
  imports: [CommonModule, IonicModule],
  exports: [ToolbarComponent, OptionsComponent, SearchAnimeComponent],
})
export class SharedModule {}
