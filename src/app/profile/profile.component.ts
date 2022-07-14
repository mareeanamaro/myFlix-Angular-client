import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  movies: any[] = [];
  userName: any = localStorage.getItem('user');
  favs: any = null;
  favMovies: any[] = [];
  displayElement: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

   /**
   * Initializes the component loading the user data
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data, including his favourite movies
   * @returns object holding user information
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    if(user) {
      this.fetchApiData.getUser().subscribe((response:any) => {
        this.user=response;
        this.fetchApiData.getAllMovies().subscribe((response: any)=> {
          this.movies = response;
          this.movies.forEach((movie: any) => {
            if(this.user.FavoriteMovies.includes(movie._id)){
              this.favMovies.push(movie);
              this.displayElement = true;
            }
          });
        });
      });
    }
  }

  /**
   * This function removes the movie being clicked on to the user's favourite movies
   * @param id of the movie
   */
  removeFromFavoriteMovies(id:string): void{
    this.fetchApiData.removeFav(id).subscribe((result) => {
      this.ngOnInit();
      window.location.reload();
    })
  }

   /**
   * This function opens the EditProfile component as a dialog allowing the user to edit their details
   */
  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px'
    })
  }

  /**
   * This function deletes all data of this user from the database and navigates the user back to the welcome page
   */
  deleteProfile(): void {
    if( confirm( 
      'Are you sure you want to delete your account? This cannot be undone'
    )) {
      this.router.navigate(['welcome'])
      .then(() => {
        this.snackBar.open('You have successfully deleted your account.', 'OK',{
          duration: 2000
        })
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      })
    }
  }

}
