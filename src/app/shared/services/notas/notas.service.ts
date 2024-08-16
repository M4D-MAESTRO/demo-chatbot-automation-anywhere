import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotaDto } from '../../interfaces/notas/nota.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(
    private readonly http: HttpClient,
    ) { }


  list(): Observable<NotaDto[]> {
    return this.http.get<NotaDto[]>(`assets/mocks/notas.json`, {
      responseType: 'json',
    });
  }
}
