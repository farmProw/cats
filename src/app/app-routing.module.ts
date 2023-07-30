import { CatSearchComponent } from './components/cat-search/cat-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatDescriptionsCardComponent } from './components/cat-descriptions-card/cat-descriptions-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cats',
    pathMatch: 'full',
  },
  {
    path: 'cats',
    component: CatSearchComponent,
  },
  {
    path: 'cat/:descriptions',
    component: CatDescriptionsCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
