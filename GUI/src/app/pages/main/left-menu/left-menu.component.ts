import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  constructor(private fb: FormBuilder) {
    this.setDefaultDate();
  }
  LeftMenuInfo = this.fb.group({
                date: [''],
                time: [''],
          adress: this.fb.group({
                start: [''],
                end: ['']}),
                near: []
   });
   setDefaultDate() {
     this.LeftMenuInfo.setValue({
       date: new Date('01.01.2019'),
       time: '8:00 am',
         adress: {
                 start: 'Купревича',
                 end: 'пр-т Победителей',
                },
           near: ''
           }
       );
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.LeftMenuInfo.value);
  }
}
