import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { REG_DATE} from '../../../shared/constants/common';
import {Router} from '@angular/router';
import {BUTTON_LABELS} from '../../../shared/constants/button-labels';
import {MapService} from "../map/map.service";

declare var ymaps: any;

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  LeftMenuInfo: FormGroup;
  buttonLabel = BUTTON_LABELS;
  constructor(private fb: FormBuilder, private router: Router, private mapper: MapService) {
    this.LeftMenuInfo = this.fb.group({
      date: ['', {
        validators: forbiddenDateValidator(new RegExp(REG_DATE)),
        updateOn: 'blur'
      }],
      time: [''],
      address: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required]}),
      near: []
    });
  }
  ngOnInit() {
    this.initYandexSuggestionsForInput();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.LeftMenuInfo.value);
    this.mapper.makeRoute();
  }

  get date() {
    return this.LeftMenuInfo.get('date');
  }

  goToBookingConfirmation() {
    this.router.navigate(['/confirmation']);
  }

  initYandexSuggestionsForInput() {
    this.mapper.initYandexSuggestionsForInput(this.LeftMenuInfo);
  }
}

export function forbiddenDateValidator(date: RegExp): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    const temp = new Date(control.value);
    let buf: string;
    buf = temp.toLocaleDateString();
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

