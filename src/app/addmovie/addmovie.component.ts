import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Movie } from '../Movie';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  addMovieForm: FormGroup;
  status:string;
  statusFlag:boolean;
  submitted:boolean;
  constructor(private formBuilder:FormBuilder ,private ms:MovieService) { }

  ngOnInit(): void {

    this.addMovieForm = this.formBuilder.group(
      {
       movieName:['',[Validators.required,Validators.pattern("^[a-zA-z0-9-\s\.]{1,20}$")]],
       rating:['', [Validators.required,Validators.min(0),Validators.max(10)]],
       genre:['',Validators.required]
      });
  }

  addMovie()
  {
 
    if(this.addMovieForm.valid)
    {
      this.submitted=false;
   
      console.log(this.addMovieForm.value);
      let movie:Movie=new Movie(this.addMovieForm.controls.movieName.value,this.addMovieForm.controls.rating.value,this.addMovieForm.controls.genre.value);
      
      this.ms.addNewMovie(movie).pipe(catchError((error: HttpErrorResponse) => {
        console.log(error.status, error.error);
        this.statusFlag = true;
        this.status = 'Error while connecting to server ';
        return throwError('Error adding movie');
      })).subscribe((data: any) => {
        console.log(data);
        this.status = 'Movie added successfully!';
        this.statusFlag = true;
      });
      this.addMovieForm.reset();
    }
    else
    {
      this.submitted=true;
    }
    if(this.statusFlag){
      alert(this.status);
    }
    
    }

  }



