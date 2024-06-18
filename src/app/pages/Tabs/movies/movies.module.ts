import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesPageRoutingModule } from './movies-routing.module';

import { MoviesPage } from './movies.page';
import { MoviePageModule } from '../../AboutMovie/movie/movie.module';


@NgModule({
  declarations: [MoviesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesPageRoutingModule,
    MoviePageModule
  ],
  exports: [MoviesPage]
})
export class MoviesPageModule { }
