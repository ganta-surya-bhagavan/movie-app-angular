import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url = 'http://localhost:8081';


  constructor(private _httpClient: HttpClient) { }


  getMoviesByGenre(genre: string): Observable<Movie> {
   let  getUrl = `${this.url}/${genre}`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.get<Movie>(getUrl);
  }
  addNewMovie(newMovie: Movie): Observable<Movie> {
   let  postUrl = `${this.url}/addmovie`;
   let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post<Movie>(postUrl, newMovie, httpOptions);
  }
}
