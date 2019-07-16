import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AUTHORIZATION_LABEL} from '../../shared/constants/authorization';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent {
  authorizationLabels = AUTHORIZATION_LABEL;

  authorizationForm: FormGroup;

  constructor(private fb: FormBuilder) { this.authorizationForm = this.fb.group({
    login: [''],
    password: ['']
  });
  }

  onSubmit() {
    alert("good job");
  }
}
