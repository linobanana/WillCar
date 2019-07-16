import {Component, Input, OnInit} from '@angular/core';

import {User} from '../../types/common';
import {MatSelectChange} from '@angular/material';
import {PROFILE_FIELD_LABELS} from '../../constants/profile';



@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() options: string[];
  profileLabels = PROFILE_FIELD_LABELS;

  constructor() { }

  ngOnInit() {
  }
  onSelectionChange(communicType: MatSelectChange): void {
    this.user.preferredCommunication = communicType.value;
  }
}
