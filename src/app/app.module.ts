import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {TimerComponent} from './timer/timer.component';
import {ScoreComponent} from './score/score.component';

import {TimerReadonlyComponent} from './timer-readonly/timer-readonly.component';
import {PenaltiesComponent} from './penalties/penalties.component';
import {TimerFormatPipe} from "./timer-format.pipe";
import {SenshuComponent} from './senshu/senshu.component';
import {PenaltiesReadonlyComponent} from "./penalties-readonly/penalties-readonly.component";
import {ScoreReadOnlyComponent} from "./score-readonly/score-readonly.component";

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerFormatPipe,
    ScoreComponent,
    ScoreReadOnlyComponent,
    TimerReadonlyComponent,
    PenaltiesComponent,
    PenaltiesReadonlyComponent,
    SenshuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
