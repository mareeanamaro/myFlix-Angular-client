import { Component, OnInit, Input } from '@angular/core';
// below you import the dependencies
// below will close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// below will allow you to use the api calls 
import { FetchApiDataService } from '../fetch-api-data.service';
// below will display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// the component decorator tells angular the class below is a component
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  // the input decorator degfines the component's input
  @Input() userCredentials = {
    Username: '',
    Password: ''
  };

  // the constructor is where you include your dependencies
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  // build the function responsible for sending the inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((result) => {
      localStorage.setItem('token', result.user.token);
      localStorage.setItem('user', result.Username);
      this.dialogRef.close(); // close dialog on success
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        })
    })
  }
}