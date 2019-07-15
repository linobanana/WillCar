import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent {
  authorizationForm = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })
  onSubmit() {
    alert("good job");
  }
}
