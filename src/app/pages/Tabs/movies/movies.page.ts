import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Genre } from 'src/app/shared/interfaces';
import { MovieTrending } from 'src/app/shared/interfacesTrending';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: MovieTrending[] = [];

  search = '';
  AllGenres: Genre[] = [];
  currentPage = 1;
  totalPages = 10;
  constructor(private serv: TmdbService) {
  }

  ngOnInit() {
    this.serv.getMoviesTrending().subscribe(x => {
      this.movies = [...x.results];
      this.currentPage = x.page;
      this.totalPages = x.total_pages;
    });
    this.serv.getAllGenres().subscribe(x => {
      this.AllGenres = [...x.genres];
    });

  }
  getGenres(movie: MovieTrending) {
    if (movie.genre_ids) {
      return this.AllGenres.filter(x => movie.genre_ids.includes(x.id)).map(x => x.name).join(' • ');
    }
    return "";
  }
  /* INFINITE SCROLL */
  getMoreData(event: InfiniteScrollCustomEvent) {
    this.currentPage += 1;
    if (this.currentPage <= this.totalPages) {
      this.serv.getMoviesTrending(this.currentPage).subscribe(x => {
        this.movies.push(...x.results);
        event.target.complete();
      });
      if (this.currentPage >= this.totalPages) {
        event.target.disabled = true;
        event.target.complete();
      }
    }
    else {
      event.target.disabled = true;
      event.target.complete();
    }
  }
  SearchByName() {
    if (this.search !== '' && this.search.length > 0) {
      this.serv.searchMovie(this.search).subscribe(
        x => {
          this.movies = x.results;
          //this.currentPage = x.page;
          //this.totalPages = x.total_pages;
        }
      );
    }
    else {
      this.serv.getMoviesTrending().subscribe(x => {
        this.movies = [...x.results];
        this.currentPage = x.page;
        this.totalPages = x.total_pages;
      });
      this.serv.getAllGenres().subscribe(x => {
        this.AllGenres = [...x.genres];
      });
    }
  }


}
