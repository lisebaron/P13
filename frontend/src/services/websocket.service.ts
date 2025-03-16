import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private subject: Subject<MessageEvent> | undefined;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected to: ' + url);
    }
    return this.subject;
  }

  public disconnect(url: string) {
    this.subject = undefined;
    console.log('Successfully disconnected from: ' + url);
  }

  private create(url: string): Subject<MessageEvent> {
    let wsc = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      wsc.onmessage = obs.next.bind(obs);
      wsc.onerror = obs.error.bind(obs);
      wsc.onclose = obs.complete.bind(obs);
      return wsc.close.bind(wsc);
    });
    let observer = {
      next: (data: Object) => {
        if (wsc.readyState === WebSocket.OPEN) {
          wsc.send(JSON.stringify(data));
        }
      },
    };
    return Subject.create(observer, observable);
  }
}
