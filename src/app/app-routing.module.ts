import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TmdbService } from './services/tmdb.service';

const routes: Routes = [

  /* {
    path: 'movies-detail/:id',
    loadChildren: () => import('./pages/movies-detail/movies-detail.module').then(m => m.MoviesDetailPageModule)
  }, */

  {
    path: '',
    children: [
      {
        path: "",
        redirectTo: 'home',
        pathMatch: 'full'
      },
      // !          T A B S

      {
        path: 'series',
        loadChildren: () => import('./pages/Tabs/series/series.module').then(m => m.SeriesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/Tabs/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/Tabs/movies/movies.module').then(m => m.MoviesPageModule)
          },
          /* {
            path: 'movies-detail/:id',
            loadChildren: () => import('./pages/AboutMovie/movies-detail/movies-detail.module').then(m => m.MoviesDetailPageModule)
          } */
          {
            path: 'detail/:id',
            loadChildren: () => import('./pages/AboutMovie/movies-detail/movies-detail.module').then(m => m.MoviesDetailPageModule)
          }

        ]
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/Tabs/home/home.module').then(m => m.HomePageModule)
      }
      // !          T A B S
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
