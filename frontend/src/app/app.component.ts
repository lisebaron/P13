import { Component } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { Message } from 'src/models/Message';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username!: string;
  text!: string;
  connected!: boolean;

  subscription!: Subscription;

  received: Message[] = [];
  sent: Message[] = [];

  constructor(private chatService: ChatService) {
  }

  connect() {
    this.connected = true;
    this.chatService.connect();
    this.subscription = this.chatService.messages.subscribe((msg) => {
      this.received.push(msg);
    });
  }

  disconnect() {
    this.received = [];
    this.sent = [];
    this.text = '';
    this.chatService.disconnect();
    this.subscription.unsubscribe();
    this.connected = false;
  }

  sendMessage() {
    const message: Message = {
      name: this.username,
      text: this.text,
      time: new Date()
    };
    this.sent.push(message);
    this.text = '';
    this.chatService.messages.next(message);
  }
}
