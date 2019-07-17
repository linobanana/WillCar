import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AUTHORIZATION_LABEL} from '../../shared/constants/authorization';
import {Router} from "@angular/router";
import {User} from "../../shared/types/common";
import {USER} from '../../shared/mocks/user.mocks';


@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent {
  authorizationLabels = AUTHORIZATION_LABEL;

  authorizationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { this.authorizationForm = this.fb.group({
    login: [''],
    password: ['']
  });
  }

  goToMain(user: User){
    if(user.login===USER.login && user.password===USER.password){
      this.router.navigate(['/main']);
    } else{
      alert("Wrong info!");
    }
  }
}
