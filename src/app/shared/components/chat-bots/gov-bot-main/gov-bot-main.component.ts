import { LoaderService } from './../../../services/app-loader/loader.service';
import { ChatBotService } from './../../../services/chat-bot/chat-bot.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gov-bot-main',
  templateUrl: './gov-bot-main.component.html',
  styleUrls: ['./gov-bot-main.component.scss'],
})
export class GovBotMainComponent implements OnInit {

  constructor(
    private readonly loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.configChatBot();
  }

  /**
     * Recarrega o script gerador do chat bot disponibilizado pela Automation Anywhere.
     * Lembre-se de adicionar o ID do projeto no script da Automation no index.html
     */
  async configChatBot() {
    await this.loaderService.defaultLoader();
    const head = document.getElementsByTagName('head')[0];
    const automationScript = head.querySelector("script[src='https://ai.automationanywhere.com/loader.min.js']");

    if (automationScript) {
      automationScript.remove();
      let node = document.createElement('script');
      node.src = 'https://ai.automationanywhere.com/loader.min.js';
      node.type = 'text/javascript';
      node.async = true;
      head.appendChild(node);
    }

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    await this.loaderService.dismissLoader();
  }


}
