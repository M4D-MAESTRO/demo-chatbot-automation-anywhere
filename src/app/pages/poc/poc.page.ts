
import { Component, OnInit, Renderer2 } from '@angular/core';
import { WebScrapingService } from './../../shared/services/utils/scraping/web-scraping.service';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.page.html',
  styleUrls: ['./poc.page.scss'],
})
export class PocPage implements OnInit {
  url: string = 'https://cnetmobile.estaleiro.serpro.gov.br/comprasnet-web/public/compras?compra=16023805000332022';
  title: string = '';

  constructor(
    private readonly webScrapingService: WebScrapingService,
    private readonly renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    //this.scrapeWebsite();
  }

  scrapeWebsite(): void {
    this.webScrapingService.scrape(this.url)
      .subscribe({
        next: data => {
          console.log(data);
          this.title = data.title;
        },
        error: error => {
          console.error('Error scraping website:', error);
        }
      });
  }

}
