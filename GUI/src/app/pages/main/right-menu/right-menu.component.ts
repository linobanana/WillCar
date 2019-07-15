import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { REG_DATE} from '../../../shared/constants/common';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {
  RightMenuInfo: FormGroup;
  constructor(private fb: FormBuilder) {
    this.RightMenuInfo = this.fb.group({
      date: ['', {
        validators: [forbiddenDateValidator(new RegExp(REG_DATE)), Validators.required],
        updateOn: 'blur'
      }],
      time: [''],
      adress: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required]}),
      numberOfSeats: ['', [negativeNumberValidator(), Validators.required]]
    });
  }
  ngOnInit() {
    this.RightMenuInfo.setValue({
        date: new Date('01.01.2019'),
        time: '8:00 am',
        adress: {
          start: 'Купревича',
          end: 'пр-т Победителей',
        },
        numberOfSeats: '1'
      }
    );
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.RightMenuInfo.value);
  }
  get date() { return this.RightMenuInfo.get('date'); }
  get numberOfSeats() {return this.RightMenuInfo.get('numberOfSeats'); }
}
export function forbiddenDateValidator(date: RegExp): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    const temp = new Date(control.value);
    let buf: string;
    buf = temp.toLocaleDateString();
    const forbidden: boolean = !(date.test(buf));
    if (control.value === null) {
      return {forbiddenDate: {value: 'There is a mistake in this date!'}};
    } else {
      return forbidden ? {forbiddenDate: {value: 'Not close date:' + buf}} : null;
    }
  };
}
export function negativeNumberValidator(): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    if (control.value !== null) {
      const temp = control.value;
      if (temp === undefined || temp === 0) {
        return {forbiddenDate: {value: 'U should provide at least one seat!'}};
      } else {
        if (temp < 0) {
          return {forbiddenDate: {value: 'Number of seats cannot be negative!'}};
        }
        return null;
      }
    } else {
      return {forbiddenDate: {value: 'U should provide at least one seat!'}};
    }
  };
}
