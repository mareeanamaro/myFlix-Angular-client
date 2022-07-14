import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * User route to navigate to /movies
   */
  gotoMovies(): void {
    this.router.navigate(['movies'])
  }

  /**
   * User route to navigate to /profile
   */
  gotoProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
   * This function logs the user out, by clearing the storage and navigates the user to the welcome
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}
