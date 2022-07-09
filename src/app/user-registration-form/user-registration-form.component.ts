import { Component, Input, OnInit } from '@angular/core';

// below you import the dependencies
// below will close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// below will allow you to use the api calls 
import { FetchApiDataService } from '../fetch-api-data.service';
// below will display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// the component decorator tells angular the class below is a component
@Component({
  // the selector defines the custom html element into which the component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  // the input decorator degfines the component's input
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  }

  // the constructor is where you include your dependencies
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  // first step of the component lifecycle
  ngOnInit(): void {
  }

  // build the function responsible for sending the inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //logic for successful user reg will go here
      this.dialogRef.close(); // close dialog on success
      this.snackBar.open('Success! Please login.', 'OK', {
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
