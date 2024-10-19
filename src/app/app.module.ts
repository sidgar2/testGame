import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameComponent } from './components/game/game.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { BlockComponent } from './components/game/block/block.component';
import {GameService} from "./services/game.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    ConfirmationModalComponent,
    BlockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
