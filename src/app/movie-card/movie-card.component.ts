import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() : void{
    this.fetchApiData.getAllMovies().subscribe((response:any) => {
      this.movies=response;
      console.log(this.movies);
      return this.movies;
    })
  }

  openSynopsis(name: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '280px'
    })
  }

  openDirectorInfo(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '280px'
    })
  }

  openGenreInfo(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '280px'
    })
  }

}


