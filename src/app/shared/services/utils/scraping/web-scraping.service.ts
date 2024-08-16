import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as cheerio from 'cheerio';

@Injectable({
  providedIn: 'root'
})
export class WebScrapingService {

  constructor(private http: HttpClient) { }

  scrape(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        const $ = cheerio.load(response);
        const title = $('title').text();
        return { title };
      })
    );
  }
}
