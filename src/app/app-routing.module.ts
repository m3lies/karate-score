import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScoreReadonlyComponent} from "./score-readonly/score-readonly.component";
import {ScoreComponent} from "./score/score.component";

const routes: Routes = [
  { path: '', redirectTo: '/score', pathMatch: 'full' },
  { path: 'score', component: ScoreComponent },
  { path: 'score-readonly', component: ScoreReadonlyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
