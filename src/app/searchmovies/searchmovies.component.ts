import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-searchmovies',
  templateUrl: './searchmovies.component.html',
  styleUrls: ['./searchmovies.component.css']
})
export class SearchmoviesComponent implements OnInit {
searchForm:FormGroup;
  genres: string[] = ['Crime', 'Drama', 'Action', 'Biography', 'Thriller'];
  submitted = false;
  movies: Movie[];
  constructor(private ms: MovieService,private formBuilder:FormBuilder) {
  

   }

  ngOnInit(): void {
    this.searchForm=this.formBuilder.group(
      {
      genre :['',Validators.required],
    }
    )
  }
  searchMovies() {
    if (this.searchForm.valid) {
      this.submitted = false;
      this.ms.getMoviesByGenre(this.searchForm.controls.genre.value).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        console.log(error.error);
        this.movies=[];
        return throwError('Error fetching data from server');
      })).subscribe((data: any) => {
        this.movies = data;
      });
    }
    else{
      this.submitted=true;
    }
  }

}
