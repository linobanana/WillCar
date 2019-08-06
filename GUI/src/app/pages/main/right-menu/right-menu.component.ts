import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { REG_DATE} from '../../../shared/constants/common';
import {Router} from '@angular/router';
import {BUTTON_LABELS} from '../../../shared/constants/button-labels';
import {MapService} from "../map/map.service";

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {
  RightMenuInfo: FormGroup;
  buttonLabel = BUTTON_LABELS;
  ifDraw = true;
  constructor(private fb: FormBuilder, private router: Router, private mapper: MapService) {
    this.RightMenuInfo = this.fb.group({
      date: [new Date(), {
        validators: [forbiddenDateValidator(new RegExp(REG_DATE)), Validators.required],
        updateOn: 'blur'
      }],
      time: ['12:00 am'],
      address: this.fb.group({
        startr: ['', Validators.required],
        endr: ['', Validators.required]
      }),
      numberOfSeats: ['1', [negativeNumberValidator(), Validators.required]]
    });
  }

  ngOnInit() {
    // this.RightMenuInfo.setValue({
    //     date: new Date('01.01.2019'),
    //     time: '8:00 am',
    //     address: {
    //       startr: 'Купревича',
    //       endr: 'пр-т Победителей',
    //     },
    //     numberOfSeats: '1'
    //   }
    // );
    this.initRelationMwithY();
  }

  onSubmit() {
  }
onSubmitForm() {
  this.mapper.cleanMap();
  this.mapper.makeRoute(this.RightMenuInfo);
  this.ifDraw = false;
}
onCreate() {
    this.mapper.cleanMap();
    this.mapper.importDrive(this.RightMenuInfo).then(() => this.mapper.exportDrive(this.RightMenuInfo));
    this.router.navigate(['/success-create']);
}
  initRelationMwithY() {
    this.mapper.initRelationMwithYForRightMenu(this.RightMenuInfo);
  }
  get date() {
    return this.RightMenuInfo.get('date');
  }

  get numberOfSeats() {
    return this.RightMenuInfo.get('numberOfSeats');
  }
}
export function forbiddenDateValidator(date: RegExp): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    const temp = new Date(control.value);
    let buf: string;
    buf = temp.toLocaleDateString('en-GB');
    const forbidden: boolean = !(date.test(buf));
    if (control.value === '') {
      return {forbiddenDate: {value: ''}};
    }
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
      if (temp === 0) {
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
