import { StringsUtils } from './../../../utils/strings';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../../../config/api.config';
import { PageUtils } from '../../../utils/PageUtils';
import { PageableDto, PageOptionsDto } from '../../../interfaces/others/pageable.dto';
import { SendEmailHtmlDto } from './../../../../shared/interfaces/comunicacoes/emails/send-email-html.dto';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private email_list: string[] = [];

  constructor(
    private readonly http: HttpClient,
  ) { }

  sendHtmlEmail(dto: SendEmailHtmlDto): Observable<any> {
    this.clearEmailList();
    return this.http.post<any>(
      `${API_CONFIG.baseURL}/mails/send`,
      dto,
      {
        responseType: 'json',
      });
  }

  addEmailToList(email: string) {
    const isValidEmail = StringsUtils.checkIfEmail(email);
    if (!isValidEmail) {
      return;
    }
    this.email_list.push(email);
  }

  removEmailFromList(email: string) {
    const isValidEmail = StringsUtils.checkIfEmail(email);
    if (!isValidEmail) {
      return;
    }

    const index = this.email_list.indexOf(email);
    if (index >= 0) {
      this.email_list.splice(index, 1);
    }

  }

  getEmailList(){
    return this.email_list;
  }

  clearEmailList(){
    this.email_list = [];
  }

}
