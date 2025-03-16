import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Message } from 'src/models/Message';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly URL = "ws://localhost:8080/ws";

  public messages!: Subject<Message>;

  constructor(
    private websocketService: WebsocketService
  ) {
  }

  public connect() {
    this.messages = <Subject<Message>>(
      this.websocketService.connect(this.URL).pipe(map((response: MessageEvent): Message => {
        let content = JSON.parse(response.data);
        return {
          name: content.name,
          text: content.text,
          time: content.time
        };
      }))
    );
  }

  public disconnect() {
    this.websocketService.disconnect(this.URL);
  }
}
