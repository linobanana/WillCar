import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../environments/environment';
import { SocketService } from '../../../shared/api/chat/socket.service';
import { ToastrService } from 'ngx-toastr';
import {Car, Message, Drive, User} from "../../../shared/types/common";
import {USER} from "../../../shared/mocks/user.mocks";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private serverUrl = environment.url + 'socket';
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;
  private form: FormGroup;
  private _drives: Drive[];
  messages: Message[];
  user: User;
  currentDrive: Drive;

  constructor(private socketService: SocketService, private toastr: ToastrService
  ) {
    this.user = USER;
    this.socketService.getDrives(this.user.id)
      .subscribe((drives) => {
          this._drives = drives;
          this.currentDrive = this._drives[0];
          this.messages = this.currentDrive.messages;
        },
        () => {
        },
        () => {
          this.initializeWebSocketConnection();
        },
      );
  }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
  }

  get drives() {
    return this._drives;
  }

  set drives(drives: Drive[]) {
    this._drives = drives;
  }

  sendMessageUsingSocket() {
    let message = {
      message: this.form.value.message,
      user:this.user.id.toString(),
      driveId:this.currentDrive.id.toString(),
      time:new Date(),
      notify:false
    };
    this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket();
      that.openSocket(that.currentDrive.id.toString() + "_" + that.user.id.toString());
      that.drives.forEach((element) => {
        that.openSocket(element.id.toString());
      });
      that.currentDrive.isOpenSocket = true;
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  openSocket(id: string) {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/"+id, (message) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message){
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      let temp = this.drives.findIndex((element) => {
        return element.id == messageResult.driveId;
      });
      this.drives[temp].messages.push(messageResult);
      this.form.reset(" ");
      this.toastr.success("new message recieved", null, {
        'timeOut': 3000
      });
    }
  }

  chooseDrive(drive: Drive) {
    this.messages = drive.messages;
    this.currentDrive = drive;
    if(!drive.isOpenSocket){
      this.openSocket(this.currentDrive.id.toString()+"_"+this.user.id.toString());
      drive.isOpenSocket = true;
      this.form.reset(" ");
    }
  }

  isMine(message: Message){
    let temp =  message.user.id==this.user.id && !message.notify;
    return temp;
  }

  isNotMine(message: Message){
    return message.user.id!==this.user.id && !message.notify;
  }
}
