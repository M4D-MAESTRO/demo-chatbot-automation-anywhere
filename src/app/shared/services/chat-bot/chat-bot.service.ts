import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  chatBotSubscriber = new ReplaySubject();

  private chatBot: ChildNode

  constructor() { }

  getChatBot() {
    return this.chatBot;
  }
  setChatBot(chatBot: ChildNode) {
    console.log(this.chatBot);
    if (!this.chatBot) {
      console.log('set new bot');
      this.chatBot = chatBot;
      //this.chatBotSubscriber.next(chatBot);
    }
  }
}
