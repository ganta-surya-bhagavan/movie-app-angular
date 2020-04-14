import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { SearchmoviesComponent } from './searchmovies/searchmovies.component';


const routes: Routes = [
  {path:'new', component: AddmovieComponent },
  {path:'search', component: SearchmoviesComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
