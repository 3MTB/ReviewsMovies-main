import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TmdbService } from './services/tmdb.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { interceptorPutParams } from './secure/interceptorPutParams.interceptor';


import { MoviesPageModule } from './pages/Tabs/movies/movies.module';
import { MoviesPage } from './pages/Tabs/movies/movies.page';
import { MoviesPageRoutingModule } from './pages/Tabs/movies/movies-routing.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MoviesPageModule
  ],
  providers: [
    {
      provide:
        RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: interceptorPutParams,
      multi: true
    },
    TmdbService,
    HttpClient,
    MoviesPageRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
