import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../shared/types/common';
import {USER} from '../../shared/mocks/user.mocks';
import {AUTHORIZATION} from '../../shared/constants/authorization';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent {
  authorizationLabels = AUTHORIZATION;

  authorizationForm: FormGroup;

  isAuthorized = true;

  constructor(private fb: FormBuilder, private router: Router) { this.authorizationForm = this.fb.group({
    login: [''],
    password: ['']
  });
  }

  goToMain(user: User) {
    if ( user.login === USER.login && user.password === USER.password ) {
      this.router.navigate(['/main']);
    } else {
      this.isAuthorized = !this.isAuthorized;
    }
  }
}
