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
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Initiliazes the component with the movie data
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

/**
 * This function gets all the movies using the API service and adds them to the local movies variable
 * @returns an array of movie objects
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
   * This function opens the synopsis component as a dialog and displays movie synopsis
   * @param name of the genre
   * @param description of the genre
   */
  openSynopsis(name: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '280px'
    })
  }

  /**
   * This function opens the DirectorComponent as a dialog and displays director information
   * @param name of the director
   * @param bio of the director
   * @param birth of the director
   * @param death of the director
   */
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

  /**
   * This function opens the GenreComponent as a dialog and displays genre information
   * @param name 
   * @param description 
   */
  openGenreInfo(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '280px'
    })
  }

  /**
   * This function gets logged in user's favorite movies
   * @returns an array of movie ids of the user's favourite movies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUserFavs().subscribe((result: any) => {
      this.favoriteMovies = result;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
     }
    )
  }

  /**
   * This function tells us if this movie is already a favourite for this user or not
   * @param id of the movie
   * @returns trur if the movie is in the array
   */
  isFav(id:string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
   * This function adds the movie being clicked on to the user's favourite movies
   * @param id of the movie
   */
  addToFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.addFav(id).subscribe((result) => {
      this.ngOnInit();
    })
  }

  /**
   * This function removes the movie being clicked on to the user's favourite movies
   * @param id of the movie
   */
  removeFromFavoriteMovies(id:string): void{
    this.fetchApiData.removeFav(id).subscribe((result) => {
      this.ngOnInit();
    })
  }

}


