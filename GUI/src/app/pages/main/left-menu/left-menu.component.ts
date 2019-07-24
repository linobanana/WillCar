import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { REG_DATE} from '../../../shared/constants/common';
import {Router} from '@angular/router';
import {BUTTON_LABELS} from '../../../shared/constants/button-labels';

declare var ymaps: any;

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  LeftMenuInfo: FormGroup;
  buttonLabel = BUTTON_LABELS;
  constructor(private fb: FormBuilder, private router: Router) {
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
    this.initYandexSuggestionsForInput();
  }
  ngOnInit() {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.LeftMenuInfo.value);
  }

  get date() {
    return this.LeftMenuInfo.get('date');
  }

  goToBookingConfirmation() {
    this.router.navigate(['/confirmation']);
  }

  initYandexSuggestionsForInput() {
    const self = this;
    ymaps.ready(init);
    function init() {
      let suggestionForStartInput = new ymaps.SuggestView('start',{
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      let suggestionForEndInput = new ymaps.SuggestView('end',{
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      suggestionForStartInput.events.add("select", function(e) {
        let startSuggestion = e.get('item').value;
        self.LeftMenuInfo.get('address').get('start').setValue(startSuggestion);
        console.log(e.get('item').value);
      });
      suggestionForEndInput.events.add("select", function(e) {
        let endSuggestion = e.get('item').value;
        self.LeftMenuInfo.get('address').get('end').setValue(endSuggestion);
        console.log(e.get('item').value);
      });
    }
  }
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

